import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Phone, Clock, Send, Shield, MessageCircle } from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/59899229981?text=Hola%2C%20quiero%20consultar%20sobre%20impermeabilizaci%C3%B3n%20de%20mi%20techo';

const surfaceTypes = [
  'Techo de hormigón',
  'Techo metálico',
  'Terraza',
  'Balcón',
  'Cubierta industrial',
  'Otra superficie',
];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    zona: '',
    superficie: '',
    mensaje: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await emailjs.send(
        import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
        import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.nombre,
          from_email: formData.email,
          phone: formData.telefono,
          zona: formData.zona,
          superficie: formData.superficie,
          message: formData.mensaje,
        },
        import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY
      );
      window.location.href = '/gracias';
    } catch {
      setError('Error al enviar. Por favor intente nuevamente o contáctenos por WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
      {/* Contact Info */}
      <div className="lg:col-span-2">
        <h2 className="font-display text-2xl font-bold text-foreground mb-8">
          Información de contacto
        </h2>

        <div className="space-y-6 mb-10">
          <a href="tel:+59899229981" className="flex items-start gap-4 group">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Teléfono / WhatsApp</p>
              <p className="text-muted-foreground">+598 99 229 981</p>
            </div>
          </a>

          <a href="mailto:info@alligatorhideuy.com" className="flex items-start gap-4 group">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <p className="font-semibold text-foreground">Email</p>
              <p className="text-muted-foreground">info@alligatorhideuy.com</p>
            </div>
          </a>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <div>
              <p className="font-semibold text-foreground">Dirección</p>
              <p className="text-muted-foreground">José Enrique Rodó 2082, Montevideo</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Horario de atención</p>
              <p className="text-muted-foreground">Lunes a Viernes: 10:00 - 18:00</p>
            </div>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div className="bg-muted rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-2">¿Prefiere WhatsApp?</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Escríbanos directamente y le responderemos a la brevedad.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full h-11 rounded-lg bg-[#25D366] hover:bg-[#20bd5c] text-white font-medium transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Abrir WhatsApp
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <div className="lg:col-span-3">
        <div className="bg-card rounded-2xl p-8 lg:p-10 shadow-lg border border-border/50">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Solicite su diagnóstico
          </h2>
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-8">
            <Clock className="w-4 h-4 text-primary flex-shrink-0" />
            Respondemos en menos de 1 hora en horario hábil
          </div>

          {error && (
            <div role="alert" className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="nombre" className="text-sm font-medium text-foreground">
                  Nombre completo *
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Su nombre"
                  required
                  aria-required="true"
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="telefono" className="text-sm font-medium text-foreground">
                  Teléfono *
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="099 123 456"
                  required
                  aria-required="true"
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="su@email.com"
                  required
                  aria-required="true"
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="zona" className="text-sm font-medium text-foreground">
                  Zona / Barrio (opcional)
                </label>
                <input
                  id="zona"
                  name="zona"
                  value={formData.zona}
                  onChange={handleChange}
                  placeholder="Ej: Pocitos, Ciudad Vieja..."
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="superficie" className="text-sm font-medium text-foreground">
                Tipo de superficie (opcional)
              </label>
              <select
                id="superficie"
                name="superficie"
                value={formData.superficie}
                onChange={handleChange}
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Seleccione una opción</option>
                {surfaceTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="mensaje" className="text-sm font-medium text-foreground">
                Mensaje (opcional)
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                placeholder="Cuéntenos sobre su proyecto o problema..."
                rows={4}
                className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[80px]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center h-12 bg-primary text-primary-foreground px-6 rounded-lg font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSubmitting ? (
                'Enviando...'
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Enviar solicitud
                </>
              )}
            </button>

            <p className="text-muted-foreground text-xs text-center flex items-center justify-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              Sin compromiso. Su información es privada y no se comparte.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
