"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { AlertCircle, Check, Copy, ExternalLink } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/SocialIcons";
import {
  eucalyptusFormOptions,
  formCopy,
  plannedFormOptions,
  services,
  type ServiceKey,
} from "@/content/forms";
import { siteSettings } from "@/config/site";
import { buildWhatsAppUrl, isWhatsAppConfigured } from "@/lib/whatsapp";
import { formatBrazilianPhone, isValidBrazilianPhone } from "@/lib/validation";
import { cn } from "@/lib/cn";

type Values = {
  name: string;
  phone: string;
  message: string;
  // eucalipto
  application: string;
  quantities: string;
  deliveryCity: string;
  fulfillment: string;
  // planejados
  environment: string;
  propertyStage: string;
  propertyCity: string;
  references: string;
  // antispam (honeypot)
  website: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = {
  name: "",
  phone: "",
  message: "",
  application: "",
  quantities: "",
  deliveryCity: "",
  fulfillment: "",
  environment: "",
  propertyStage: "",
  propertyCity: "",
  references: "",
  website: "",
};

function validate(service: ServiceKey, v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Informe seu nome.";
  if (!v.phone.trim()) e.phone = "Informe seu WhatsApp com DDD.";
  else if (!isValidBrazilianPhone(v.phone)) e.phone = "Informe um número válido com DDD. Ex.: (34) 99999-9999.";
  if (v.message.trim().length < 10) e.message = "Conte um pouco mais sobre sua necessidade (mínimo de 10 caracteres).";
  if (service === "eucalipto") {
    if (!v.application) e.application = "Selecione a aplicação desejada.";
    if (!v.fulfillment) e.fulfillment = "Indique se prefere retirada ou entrega.";
    if (v.fulfillment === "Entrega" && !v.deliveryCity.trim()) e.deliveryCity = "Informe a cidade de entrega.";
  } else {
    if (!v.environment) e.environment = "Selecione o ambiente desejado.";
    if (!v.propertyStage) e.propertyStage = "Indique a etapa do imóvel.";
  }
  return e;
}

function buildMessage(service: ServiceKey, v: Values) {
  const label = services.find((s) => s.key === service)?.label ?? service;
  const lines = [
    `Olá, MAPASA! Gostaria de solicitar um orçamento de ${label.toLowerCase()}.`,
    "",
    `*Nome:* ${v.name.trim()}`,
    `*WhatsApp:* ${formatBrazilianPhone(v.phone)}`,
    `*Especialidade:* ${label}`,
  ];
  if (service === "eucalipto") {
    lines.push(`*Aplicação desejada:* ${v.application}`);
    if (v.quantities.trim()) lines.push(`*Medidas ou quantidades:* ${v.quantities.trim()}`);
    lines.push(`*Retirada ou entrega:* ${v.fulfillment}`);
    if (v.deliveryCity.trim()) lines.push(`*Cidade de entrega:* ${v.deliveryCity.trim()}`);
  } else {
    lines.push(`*Ambiente desejado:* ${v.environment}`);
    lines.push(`*Etapa do imóvel:* ${v.propertyStage}`);
    if (v.propertyCity.trim()) lines.push(`*Cidade do imóvel:* ${v.propertyCity.trim()}`);
    if (v.references.trim()) lines.push(`*Referências e observações:* ${v.references.trim()}`);
  }
  lines.push("", `*Necessidade:* ${v.message.trim()}`);
  return lines.join("\n");
}

type Result = { kind: "whatsapp"; url: string } | { kind: "copy"; message: string };

export function LeadForm({
  initialService = "eucalipto",
  allowServiceChoice = false,
  readServiceFromUrl = false,
  tone = "light",
}: {
  initialService?: ServiceKey;
  allowServiceChoice?: boolean;
  /** Lê ?servico=eucalipto|planejados da URL (página de contato). */
  readServiceFromUrl?: boolean;
  tone?: "light" | "dark";
}) {
  const id = useId();
  const [service, setService] = useState<ServiceKey>(initialService);
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [result, setResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const configured = isWhatsAppConfigured();

  useEffect(() => {
    if (!readServiceFromUrl) return;
    const s = new URLSearchParams(window.location.search).get("servico");
    if (s === "eucalipto" || s === "planejados") setService(s);
  }, [readServiceFromUrl]);

  useEffect(() => {
    if (result) resultRef.current?.focus();
  }, [result]);

  const set = (key: keyof Values) => (value: string) => {
    setValues((v) => ({ ...v, [key]: key === "phone" ? formatBrazilianPhone(value) : value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    setResult(null);
  };

  function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (values.website) return; // honeypot preenchido: provável robô
    const errs = validate(service, values);
    setErrors(errs);
    const firstInvalid = Object.keys(errs)[0];
    if (firstInvalid) {
      const el = document.getElementById(`${id}-${firstInvalid}`);
      el?.focus();
      return;
    }
    const message = buildMessage(service, values);
    const url = buildWhatsAppUrl(message);
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
      setResult({ kind: "whatsapp", url });
    } else {
      setResult({ kind: "copy", message });
    }
  }

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  const errorCount = Object.values(errors).filter(Boolean).length;
  const field = (key: keyof Values) => ({
    id: `${id}-${key}`,
    name: key,
    value: values[key],
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${id}-${key}-error` : undefined,
  });

  return (
    <div
      className={cn(
        "rounded-[8px] p-6 md:p-8 lg:p-10",
        tone === "light" ? "bg-white shadow-[0_1px_2px_rgba(31,77,54,0.06),0_20px_50px_-30px_rgba(31,77,54,0.35)]" : "bg-white",
      )}
    >
      <form noValidate onSubmit={onSubmit} aria-describedby={`${id}-privacy`}>
        {errorCount > 0 && (
          <div
            ref={summaryRef}
            role="alert"
            className="mb-6 flex items-start gap-3 rounded-[6px] border border-[#a3381f]/30 bg-[#a3381f]/[0.06] px-4 py-3 text-[14px] text-[#7d2a17]"
          >
            <AlertCircle aria-hidden className="mt-0.5 size-5 shrink-0" />
            <p>
              {errorCount === 1 ? "Há 1 campo" : `Há ${errorCount} campos`} para revisar antes de enviar.
            </p>
          </div>
        )}

        {/* Especialidade */}
        {allowServiceChoice ? (
          <fieldset>
            <legend className="mb-3 text-[13px] font-bold text-forest">
              Especialidade <span className="text-heartwood">*</span>
            </legend>
            <div className="grid grid-cols-2 gap-2 rounded-full bg-sand p-1.5" role="radiogroup">
              {services.map((s) => (
                <label
                  key={s.key}
                  className={cn(
                    "relative flex min-h-11 cursor-pointer items-center justify-center rounded-full px-4 text-center text-[14px] font-bold transition-colors",
                    service === s.key ? "bg-forest text-white" : "text-forest hover:bg-white",
                  )}
                >
                  <input
                    type="radio"
                    name="service"
                    value={s.key}
                    checked={service === s.key}
                    onChange={() => {
                      setService(s.key);
                      setErrors({});
                      setResult(null);
                    }}
                    className="sr-only"
                  />
                  {s.label}
                </label>
              ))}
            </div>
          </fieldset>
        ) : (
          <input type="hidden" name="service" value={service} />
        )}

        <div className={cn("grid gap-5 md:grid-cols-2", allowServiceChoice && "mt-6")}>
          <Field label="Nome" required error={errors.name} htmlFor={`${id}-name`} errorId={`${id}-name-error`}>
            <input
              {...field("name")}
              type="text"
              autoComplete="name"
              className="field-input"
              placeholder="Seu nome"
              onChange={(e) => set("name")(e.target.value)}
            />
          </Field>
          <Field label="WhatsApp" required error={errors.phone} htmlFor={`${id}-phone`} errorId={`${id}-phone-error`}>
            <input
              {...field("phone")}
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              className="field-input"
              placeholder="(DDD) 99999-9999"
              onChange={(e) => set("phone")(e.target.value)}
            />
          </Field>

          {service === "eucalipto" ? (
            <>
              <Field
                label="Aplicação desejada"
                required
                error={errors.application}
                htmlFor={`${id}-application`}
                errorId={`${id}-application-error`}
              >
                <select
                  {...field("application")}
                  className="field-input field-select"
                  onChange={(e) => set("application")(e.target.value)}
                >
                  <option value="">Selecione</option>
                  {eucalyptusFormOptions.applications.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field label="Medidas ou quantidades" htmlFor={`${id}-quantities`} hint="Se souber">
                <input
                  {...field("quantities")}
                  type="text"
                  className="field-input"
                  placeholder="Ex.: quantidade de peças, comprimento"
                  onChange={(e) => set("quantities")(e.target.value)}
                />
              </Field>
              <RadioGroup
                label="Retirada ou entrega"
                required
                name={`${id}-fulfillment`}
                firstId={`${id}-fulfillment`}
                options={eucalyptusFormOptions.fulfillment}
                value={values.fulfillment}
                onChange={set("fulfillment")}
                error={errors.fulfillment}
                errorId={`${id}-fulfillment-error`}
              />
              <Field
                label="Cidade de entrega"
                required={values.fulfillment === "Entrega"}
                error={errors.deliveryCity}
                htmlFor={`${id}-deliveryCity`}
                errorId={`${id}-deliveryCity-error`}
              >
                <input
                  {...field("deliveryCity")}
                  type="text"
                  autoComplete="address-level2"
                  className="field-input"
                  placeholder="Cidade / UF"
                  onChange={(e) => set("deliveryCity")(e.target.value)}
                />
              </Field>
            </>
          ) : (
            <>
              <Field
                label="Ambiente desejado"
                required
                error={errors.environment}
                htmlFor={`${id}-environment`}
                errorId={`${id}-environment-error`}
              >
                <select
                  {...field("environment")}
                  className="field-input field-select"
                  onChange={(e) => set("environment")(e.target.value)}
                >
                  <option value="">Selecione</option>
                  {plannedFormOptions.environments.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field label="Cidade do imóvel" htmlFor={`${id}-propertyCity`}>
                <input
                  {...field("propertyCity")}
                  type="text"
                  autoComplete="address-level2"
                  className="field-input"
                  placeholder="Cidade / UF"
                  onChange={(e) => set("propertyCity")(e.target.value)}
                />
              </Field>
              <div className="md:col-span-2">
                <RadioGroup
                  label="Etapa do imóvel"
                  required
                  name={`${id}-propertyStage`}
                  firstId={`${id}-propertyStage`}
                  options={plannedFormOptions.propertyStage}
                  value={values.propertyStage}
                  onChange={set("propertyStage")}
                  error={errors.propertyStage}
                  errorId={`${id}-propertyStage-error`}
                />
              </div>
              <div className="md:col-span-2">
                <Field label="Referências e observações" htmlFor={`${id}-references`} hint="Opcional">
                  <input
                    {...field("references")}
                    type="text"
                    className="field-input"
                    placeholder="Estilo, cores, links de inspiração, prazos"
                    onChange={(e) => set("references")(e.target.value)}
                  />
                </Field>
              </div>
            </>
          )}

          <div className="md:col-span-2">
            <Field
              label="Conte sua necessidade"
              required
              error={errors.message}
              htmlFor={`${id}-message`}
              errorId={`${id}-message-error`}
            >
              <textarea
                {...field("message")}
                rows={4}
                className="field-input resize-y"
                placeholder={
                  service === "eucalipto"
                    ? "Descreva a obra ou o uso previsto para o eucalipto."
                    : "Descreva o ambiente, o que você imagina e o que é importante para você."
                }
                onChange={(e) => set("message")(e.target.value)}
              />
            </Field>
          </div>
        </div>

        {/* Honeypot antispam: invisível para pessoas, preenchido por robôs. */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={`${id}-website`}>Não preencha este campo</label>
          <input
            id={`${id}-website`}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => setValues((v) => ({ ...v, website: e.target.value }))}
          />
        </div>

        <div className="mt-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p id={`${id}-privacy`} className="max-w-[420px] text-[12.5px] leading-relaxed text-muted">
            {formCopy.privacyNote}{" "}
            <Link href="/privacidade" className="font-semibold text-forest underline underline-offset-2">
              Política de privacidade
            </Link>
            .
          </p>
          <button
            type="submit"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2.5 rounded-full bg-gold px-8 text-[14px] font-bold text-forest transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-hover"
          >
            {configured && <WhatsAppIcon className="size-5" />}
            {configured ? formCopy.submitWhatsApp : formCopy.submitUnconfigured}
          </button>
        </div>
      </form>

      {result && (
        <div
          ref={resultRef}
          tabIndex={-1}
          role="status"
          className="mt-7 rounded-[8px] border border-forest/15 bg-sand p-5 outline-none md:p-6"
        >
          {result.kind === "whatsapp" ? (
            <>
              <p className="font-heading text-[18px] font-medium text-forest">Sua mensagem foi preparada no WhatsApp.</p>
              <p className="mt-2 text-[14px] text-muted">
                Abrimos o WhatsApp oficial da MAPASA em uma nova aba com os dados preenchidos. Confirme o envio por lá
                para concluir a solicitação.
              </p>
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-[14px] font-bold text-forest underline underline-offset-4"
              >
                Abrir o WhatsApp novamente <ExternalLink aria-hidden className="size-4" />
              </a>
            </>
          ) : (
            <>
              <p className="font-heading text-[18px] font-medium text-forest">Sua solicitação está pronta.</p>
              <p className="mt-2 text-[14px] text-muted">
                O WhatsApp oficial da MAPASA ainda está sendo configurado neste site, por isso nada foi enviado
                automaticamente. Copie o texto abaixo para encaminhar à nossa equipe
                {siteSettings.email ? " pelo e-mail informado." : " assim que os canais oficiais forem publicados."}
              </p>
              <label htmlFor={`${id}-result`} className="sr-only">
                Texto da solicitação
              </label>
              <textarea
                id={`${id}-result`}
                readOnly
                value={result.message.replace(/\*/g, "")}
                rows={7}
                className="field-input mt-4 bg-white font-mono text-[13px]"
              />
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => copy(result.message.replace(/\*/g, ""))}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-forest px-6 text-[13.5px] font-bold text-white transition-colors hover:bg-forest-deep"
                >
                  {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
                  {copied ? "Copiado" : "Copiar solicitação"}
                </button>
                {siteSettings.email && (
                  <a
                    href={`mailto:${siteSettings.email}?subject=${encodeURIComponent("Solicitação de orçamento")}&body=${encodeURIComponent(result.message.replace(/\*/g, ""))}`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-forest px-6 text-[13.5px] font-bold text-forest"
                  >
                    Enviar por e-mail
                  </a>
                )}
              </div>
              <p aria-live="polite" className="sr-only">
                {copied ? "Solicitação copiada para a área de transferência." : ""}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  required,
  error,
  htmlFor,
  errorId,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  htmlFor: string;
  errorId?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 flex items-baseline justify-between gap-3 text-[13px] font-bold text-forest">
        <span>
          {label} {required && <span className="text-heartwood">*</span>}
        </span>
        {hint && <span className="text-[12px] font-medium text-muted">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={errorId} className="mt-1.5 flex items-center gap-1.5 text-[12.5px] font-medium text-[#a3381f]">
          <AlertCircle aria-hidden className="size-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}

function RadioGroup({
  label,
  required,
  name,
  firstId,
  options,
  value,
  onChange,
  error,
  errorId,
}: {
  label: string;
  required?: boolean;
  name: string;
  firstId: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
  errorId: string;
}) {
  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="mb-2 text-[13px] font-bold text-forest">
        {label} {required && <span className="text-heartwood">*</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o, i) => (
          <label
            key={o}
            className={cn(
              "flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-[13.5px] font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gold",
              value === o ? "border-forest bg-forest text-white" : "border-border bg-white text-forest hover:border-forest/50",
              error && value !== o && "border-[#a3381f]/50",
            )}
          >
            <input
              id={i === 0 ? firstId : undefined}
              type="radio"
              name={name}
              value={o}
              checked={value === o}
              onChange={() => onChange(o)}
              className="sr-only"
              aria-invalid={error ? true : undefined}
            />
            {o}
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 flex items-center gap-1.5 text-[12.5px] font-medium text-[#a3381f]">
          <AlertCircle aria-hidden className="size-3.5" />
          {error}
        </p>
      )}
    </fieldset>
  );
}
