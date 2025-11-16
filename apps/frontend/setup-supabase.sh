#!/bin/bash

# 🚀 Script de Setup Automático do Supabase
# Execute: chmod +x setup-supabase.sh && ./setup-supabase.sh

set -e

echo "🚀 Configurando Supabase para AquiTem FCTE..."
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para mensagens coloridas
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    log_error "Execute este script na raiz do projeto (onde está o package.json)"
    exit 1
fi

# Verificar se o Supabase CLI está instalado
if ! command -v supabase &> /dev/null; then
    log_error "Supabase CLI não encontrado!"
    echo "Instale com: curl -sSL https://github.com/supabase/cli/releases/download/v1.187.10/supabase_1.187.10_linux_amd64.deb -o supabase.deb && sudo dpkg -i supabase.deb"
    exit 1
fi

log_success "Supabase CLI encontrado!"

# Verificar se já foi inicializado
if [ ! -d "supabase" ]; then
    log_info "Inicializando projeto Supabase..."
    supabase init --force
    log_success "Projeto Supabase inicializado!"
else
    log_warning "Projeto Supabase já existe, pulando inicialização..."
fi

echo ""
log_info "Opções de setup:"
echo "1) 🌐 Conectar com projeto online (recomendado para produção)"
echo "2) 💻 Rodar ambiente local (para desenvolvimento sem internet)"
echo "3) ⚙️  Apenas aplicar migrações (se já configurado)"
echo ""

read -p "Escolha uma opção (1-3): " choice

case $choice in
    1)
        echo ""
        log_info "Setup para projeto online..."
        echo ""
        
        echo "Para conectar com projeto online, você precisa:"
        echo "1. Criar um projeto em https://supabase.com"
        echo "2. Anotar o Project ID (encontra-se na URL ou Settings > General)"
        echo ""
        
        read -p "Digite o Project ID do seu projeto Supabase: " PROJECT_ID
        
        if [ -z "$PROJECT_ID" ]; then
            log_error "Project ID não pode estar vazio!"
            exit 1
        fi
        
        log_info "Conectando com projeto $PROJECT_ID..."
        supabase link --project-ref "$PROJECT_ID"
        
        log_info "Aplicando migrações no projeto online..."
        supabase db push
        
        log_success "Migrações aplicadas com sucesso!"
        
        echo ""
        log_info "Configure suas variáveis de ambiente:"
        echo "1. Vá para https://supabase.com/dashboard/project/$PROJECT_ID/settings/api"
        echo "2. Copie a URL e a anon key"
        echo "3. Atualize o arquivo .env.local:"
        echo ""
        echo "NEXT_PUBLIC_SUPABASE_URL=https://$PROJECT_ID.supabase.co"
        echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key-aqui"
        ;;
        
    2)
        echo ""
        log_info "Iniciando ambiente local..."
        log_warning "Primeira execução pode demorar 3-5 minutos para baixar imagens Docker..."
        
        supabase start
        
        log_info "Aplicando migrações localmente..."
        supabase migration up
        
        log_success "Ambiente local configurado!"
        
        echo ""
        log_info "URLs locais disponíveis:"
        supabase status
        
        echo ""
        log_info "Configure .env.local para desenvolvimento local:"
        echo "NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321"
        echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"
        ;;
        
    3)
        echo ""
        log_info "Aplicando migrações..."
        
        if [ -f "supabase/.env" ] || [ -f ".env.local" ]; then
            supabase migration up
            log_success "Migrações aplicadas!"
        else
            log_error "Projeto não parece estar configurado. Execute a opção 1 ou 2 primeiro."
            exit 1
        fi
        ;;
        
    *)
        log_error "Opção inválida!"
        exit 1
        ;;
esac

echo ""
log_success "Setup concluído!"
echo ""
log_info "Próximos passos:"
echo "1. Configure as variáveis de ambiente no .env.local"
echo "2. Execute: npm run dev"
echo "3. Teste o cadastro em http://localhost:3000/cadastrar"
echo "4. Verifique o banco no Supabase Dashboard ou Studio local"
echo ""
log_info "Documentação:"
echo "📚 SUPABASE-MIGRATIONS.md - Como usar migrações"
echo "🎯 SUPABASE-SETUP.md - Setup detalhado"
echo ""
log_success "Divirta-se desenvolvendo! 🎉"