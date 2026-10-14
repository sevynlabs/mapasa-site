/**
 * DEPOIMENTOS
 * Somente depoimentos reais, com autorização registrada do cliente (permissionGranted: true).
 * Sem depoimentos autorizados, a seção não é exibida.
 */
export type Testimonial = {
  id: string;
  author: string;
  context?: string;
  quote: string;
  permissionGranted: boolean;
};

const testimonials: Testimonial[] = [];

export const approvedTestimonials = () => testimonials.filter((t) => t.permissionGranted);
