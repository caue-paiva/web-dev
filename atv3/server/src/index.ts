import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { initDatabase } from './db';
import { seedPotions } from './seed';
import potionsRouter from './routes/potions';

const app = express();
const PORT = process.env.PORT || 3000;

// ========================================
// MIDDLEWARES
// ========================================

// CORS - Permite requisições do frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true,
}));

// Parse JSON
app.use(express.json());

// Parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ========================================
// ROTAS
// ========================================

// Rota raiz
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'API Poções e Soluções',
    version: '1.0.0',
    endpoints: {
      potions: '/api/potions',
      health: '/health',
    },
  });
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
  });
});

// Rotas de poções
app.use('/api/potions', potionsRouter);

// ========================================
// ERROR HANDLING
// ========================================

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Endpoint não encontrado',
    path: req.path,
  });
});

// Error Handler Geral
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Erro não tratado:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Erro interno do servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// ========================================
// INICIALIZAÇÃO
// ========================================

const startServer = async (): Promise<void> => {
  try {
    // Inicializa banco de dados
    await initDatabase();

    // Popula banco com dados iniciais
    await seedPotions();

    // Inicia servidor
    app.listen(PORT, () => {
      console.log('========================================');
      console.log('  🧪 Poções e Soluções - API Server');
      console.log('========================================');
      console.log(`  Servidor rodando em: http://localhost:${PORT}`);
      console.log(`  Ambiente: ${process.env.NODE_ENV || 'development'}`);
      console.log('========================================');
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

// Tratamento de sinais de término
process.on('SIGINT', () => {
  console.log('\n\nEncerrando servidor...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n\nEncerrando servidor...');
  process.exit(0);
});

// Inicia o servidor
startServer();
