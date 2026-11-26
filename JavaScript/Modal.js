// Exibe o modal automaticamente ao abrir a página
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('pixModal').style.display = 'flex';
});

// Fecha o modal ao clicar no botão 'X'
function closeModal() {
    document.getElementById('pixModal').style.display = 'none';
}

// Fecha o modal ao clicar fora da caixa principal
window.addEventListener('click', (event) => {
    const modal = document.getElementById('pixModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Fecha o modal ao pressionar Escape
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Função para copiar a chave Pix para a área de transferência
// Funciona em todos os navegadores (incluindo mobile e HTTP)
function copyPixCode() {
    const pixCode = document.getElementById('pixCodeText').innerText.trim();
    const copyBtn = document.getElementById('copyBtn');

    function onSuccess() {
        copyBtn.innerText = '✓ Copiado!';
        copyBtn.classList.add('copied');
        setTimeout(() => {
            copyBtn.innerText = 'Copiar Código Pix';
            copyBtn.classList.remove('copied');
        }, 2500);
    }

    function onError() {
        // Fallback: seleciona o texto para cópia manual
        const range = document.createRange();
        range.selectNodeContents(document.getElementById('pixCodeText'));
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);

        try {
            const ok = document.execCommand('copy');
            if (ok) {
                onSuccess();
            } else {
                copyBtn.innerText = 'Selecione e copie (Ctrl+C)';
                setTimeout(() => {
                    copyBtn.innerText = 'Copiar Código Pix';
                }, 3000);
            }
        } catch (e) {
            copyBtn.innerText = 'Selecione e copie (Ctrl+C)';
            setTimeout(() => {
                copyBtn.innerText = 'Copiar Código Pix';
            }, 3000);
        }
    }

    // Tenta usar a API moderna primeiro
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(pixCode)
            .then(onSuccess)
            .catch(onError);
    } else {
        // Fallback com textarea oculta (funciona em HTTP e navegadores antigos)
        const textArea = document.createElement('textarea');
        textArea.value = pixCode;
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
