export const prerender = false;

export async function POST({ request }: { request: Request }) {
    const formData = await request.formData();
    const token = formData.get('recaptcha_token');
    const secretKey = '6LfwAO0sAAAAACyhQw6v9Ml5PDQCvOhVNcVQxprc';

    console.log('Token received:', token ? 'yes' : 'no');

    const verifyRes = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
        { method: 'POST' }
    );
    const verifyData = await verifyRes.json();

    console.log('reCAPTCHA response:', JSON.stringify(verifyData));

    if (!verifyData.success || verifyData.score < 0.5) {
        return new Response(JSON.stringify({ 
            success: false, 
            error: 'reCAPTCHA failed',
            details: verifyData 
        }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
}