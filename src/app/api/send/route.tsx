import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Crea una instancia de Resend usando la API Key de tus variables de entorno
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Extrae los datos del cuerpo de la solicitud
    const { name, email, message } = await request.json();

    // Envía el correo usando Resend
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Remitente (usa el de prueba de Resend)
      to: ['leybrak22@gmail.com'], // ¡¡REEMPLAZA ESTO con tu email!!
      subject: `Nuevo mensaje de ${name} desde tu portafolio`,
      react: (
        <div>
          <h1>Nuevo Contacto de Portafolio</h1>
          <p><strong>Nombre:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <hr />
          <h2>Mensaje:</h2>
          <p>{message}</p>
        </div>
      ),
    });

    // Devuelve una respuesta de éxito
    return NextResponse.json({ message: 'Email sent successfully!', data });

  } catch (error) {
    // Devuelve una respuesta de error si algo falla
    return NextResponse.json({ message: 'Error sending email', error }, { status: 500 });
  }
}