  
 // ==================== PÁGINA DE CONTRIBUIÇÃO ====================

// Copiar Pix para a área de transferência
// Funciona em todos os navegadores (incluindo mobile e HTTP)
function copiarPix() {
    const pixInput = document.getElementById('pixInput');
    if (!pixInput) return;
    const pix = pixInput.value;
    const btn = document.querySelector('.btn-copiar');

    function onSuccess() {
        if (btn) {
            btn.textContent = '✓ Copiado!';
            btn.classList.add('copiado');
            setTimeout(() => {
                btn.textContent = '📋 Copiar Pix';
                btn.classList.remove('copiado');
            }, 2000);
        }
    }

    function onError() {
        // Seleciona o texto para cópia manual
        pixInput.select();
        pixInput.setSelectionRange(0, 99999);
        try {
            const ok = document.execCommand('copy');
            if (ok) {
                onSuccess();
            } else if (btn) {
                btn.textContent = 'Selecione e copie (Ctrl+C)';
                setTimeout(() => { btn.textContent = '📋 Copiar Pix'; }, 3000);
            }
        } catch (e) {
            if (btn) {
                btn.textContent = 'Selecione e copie (Ctrl+C)';
                setTimeout(() => { btn.textContent = '📋 Copiar Pix'; }, 3000);
            }
        }
    }

    // Tenta usar a API moderna primeiro
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(pix)
            .then(onSuccess)
            .catch(onError);
    } else {
        // Fallback com textarea oculta (funciona em HTTP e navegadores antigos)
        const textArea = document.createElement('textarea');
        textArea.value = pix;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '-9999px';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            const ok = document.execCommand('copy');
            if (ok) {
                onSuccess();
            } else {
                onError();
            }
        } catch (err) {
            onError();
        }
        document.body.removeChild(textArea);
    }
}

// Selecionar texto do input
function selecionarTexto(input) {
    input.select();
    document.execCommand('copy');
}

// Atualizar ano no footer
function atualizarAno() {
    const anoElem = document.getElementById('DivFooterP@');
    if (anoElem) {
        const ano = new Date().getFullYear();
        anoElem.innerHTML = `© ${ano} Kel Designer. Todos os direitos reservados.`;
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    atualizarAno();
});