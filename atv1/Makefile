# Makefile para Máquina de Refrigerante
PORT = 8000
URL = http://localhost:$(PORT)

.PHONY: help start dev stop

# Target padrão
help:
	@echo "Comandos disponíveis:"
	@echo "  make start  - Inicia servidor na porta $(PORT)"
	@echo "  make dev    - Inicia servidor e abre navegador"
	@echo "  make stop   - Para o servidor"
	@echo ""
	@echo "Acesse: $(URL)"

# Inicia o servidor HTTP
start:
	@echo "🚀 Servidor iniciado em $(URL)"
	@echo "Pressione Ctrl+C para parar"
	@python3 -m http.server $(PORT)

# Desenvolvimento - inicia servidor e abre navegador
dev:
	@echo "🚀 Abrindo navegador em $(URL)"
	@(sleep 2 && open $(URL)) &
	@python3 -m http.server $(PORT)

# Para o servidor
stop:
	@echo "🛑 Parando servidor..."
	@lsof -ti:$(PORT) | xargs kill -9 2>/dev/null || true
	@echo "✅ Servidor parado!"
