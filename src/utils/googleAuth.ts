// Utilidad para manejar autenticación con Google Cloud cuando se usa cuenta de servicio
// Para The AI Championship 2025 - MERS Hackathon

interface ServiceAccountCredentials {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
}

class GoogleAuthHelper {
  private serviceAccountEmail: string;
  private projectId: string;

  constructor() {
    // Datos de tu cuenta de servicio
    this.serviceAccountEmail = 'iasi-pipeline-prod@appspot.gserviceaccount.com';
    this.projectId = 'iasi-pipeline-prod'; // Inferido del email
  }

  // Método temporal para hackathon - usar API Key directa si es posible
  async makeGeminiRequest(prompt: string, apiKey?: string): Promise<any> {
    try {
      // Intento 1: API Key directa (si funciona)
      if (apiKey && !apiKey.includes('service-account')) {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }]
            })
          }
        );
        
        if (response.ok) {
          return await response.json();
        }
      }

      // Intento 2: OAuth2 con cuenta de servicio (requiere credenciales)
      console.warn('⚠️ API Key requiere OAuth2. Necesitas credenciales de cuenta de servicio.');
      
      // Para el hackathon, usar modo simulado
      return this.generateMockResponse(prompt);
      
    } catch (error) {
      console.error('Error en Google API:', error);
      return this.generateMockResponse(prompt);
    }
  }

  // Respuesta simulada para demo del hackathon
  private generateMockResponse(prompt: string): any {
    const responses = {
      'validador': 'El ValidadorCriterio es la neurona ejecutiva de MERS que evalúa la fiabilidad, coherencia e impacto de las correcciones humanas antes de almacenarlas en el REC.',
      'hemisferio': 'MERS usa arquitectura hemisférica: Hemisferio A procesa datos técnicos, Hemisferio B desarrolla conciencia pedagógica y aprende de retroalimentación humana.',
      'rec': 'El REC (Repositorio de Experiencias Contextuales) almacena patrones pedagógicos validados que permiten a MERS generar explicaciones adaptativas basadas en experiencias previas.',
      'default': `MERS responde: He procesado tu consulta "${prompt.substring(0, 50)}" usando arquitectura cognitiva hemisférica. Esta es una respuesta simulada para el hackathon The AI Championship 2025.`
    };

    const key = Object.keys(responses).find(k => 
      prompt.toLowerCase().includes(k)
    ) || 'default';

    return {
      candidates: [{
        content: {
          parts: [{ text: responses[key as keyof typeof responses] }]
        }
      }]
    };
  }

  // Instrucciones para obtener credenciales de cuenta de servicio
  getServiceAccountInstructions(): string {
    return `
    Para usar OAuth2 con cuenta de servicio:
    
    1. Ve a: https://console.cloud.google.com/iam-admin/serviceaccounts
    2. Busca: ${this.serviceAccountEmail}
    3. Click "Actions" → "Manage keys"  
    4. Click "Add key" → "Create new key" → JSON
    5. Descarga el archivo JSON
    6. Guarda como: service-account-key.json
    7. Configura variable: GOOGLE_SERVICE_ACCOUNT_KEY=ruta_al_archivo
    `;
  }
}

export const googleAuth = new GoogleAuthHelper();