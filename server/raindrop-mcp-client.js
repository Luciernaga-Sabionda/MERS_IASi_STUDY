/**
 * MERS Raindrop MCP Client
 * Conecta con el servidor MCP de Raindrop para usar SmartComponents reales
 */
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { spawn } from 'child_process';

let mcpClient = null;
let isConnected = false;

/**
 * Inicializa el cliente MCP de Raindrop
 */
export async function initRaindropMCP() {
  try {
    console.log('🌧️ Inicializando Raindrop MCP Server...');
    
    // Verificar si existe API key de Raindrop
    const raindropToken = process.env.RAINDROP_TEST_TOKEN || process.env.RAINDROP_TOKEN;
    if (!raindropToken) {
      throw new Error('RAINDROP_TEST_TOKEN no configurado en .env');
    }

    console.log(`🔑 Raindrop token configurado: ${raindropToken.substring(0, 8)}...`);

    // Crear transporte usando el servidor MCP de Raindrop
    const transport = new StdioClientTransport({
      command: 'npx',
      args: ['-y', '@briansunter/raindrop-mcp'],
      env: {
        ...process.env,
        RAINDROP_TOKEN: raindropToken,
        RAINDROP_TEST_TOKEN: raindropToken
      }
    });

    // Crear cliente MCP
    mcpClient = new Client({
      name: 'mers-iasp-study',
      version: '1.0.0'
    }, {
      capabilities: {}
    });

    // Conectar
    await mcpClient.connect(transport);
    isConnected = true;

    console.log('✅ Raindrop MCP Server conectado exitosamente');

    // Listar herramientas disponibles
    const tools = await mcpClient.listTools();
    console.log('🛠️ Herramientas Raindrop disponibles:', tools.tools.map(t => t.name));

    return mcpClient;
  } catch (error) {
    console.error('❌ Error conectando Raindrop MCP:', error.message);
    isConnected = false;
    throw error;
  }
}

/**
 * Llama a un SmartComponent de Raindrop
 */
export async function callRaindropTool(toolName, args) {
  if (!isConnected || !mcpClient) {
    throw new Error('Raindrop MCP no está conectado. Llama a initRaindropMCP() primero.');
  }

  try {
    const result = await mcpClient.callTool({
      name: toolName,
      arguments: args
    });
    return result;
  } catch (error) {
    console.error(`❌ Error llamando herramienta ${toolName}:`, error);
    throw error;
  }
}

/**
 * Obtiene el estado de conexión de Raindrop MCP
 */
export function getRaindropStatus() {
  return {
    connected: isConnected,
    client: mcpClient ? 'Raindrop MCP Client' : null
  };
}

/**
 * Cierra la conexión MCP
 */
export async function closeRaindropMCP() {
  if (mcpClient) {
    try {
      await mcpClient.close();
      isConnected = false;
      console.log('🌧️ Raindrop MCP desconectado');
    } catch (error) {
      console.error('❌ Error cerrando Raindrop MCP:', error);
    }
  }
}
