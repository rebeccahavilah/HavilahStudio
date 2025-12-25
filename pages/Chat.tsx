// Dentro de pages/Chat.tsx

// ... importações ...
import { sendMessageToApi } from '../services/geminiService'; // Importação alterada

// ...

const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = { /* ... */ };
    
    // Pega o histórico atual antes de enviar
    const currentHistory = messages
        .filter(m => m.id !== 'welcome' && m.id !== 'init-error')
        .map(({ role, text }) => ({ role, text }));

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
        const stream = await sendMessageToApi(currentHistory, userMessage.text);
        const reader = stream.getReader();
        const decoder = new TextDecoder();
        let fullResponse = "";
        const botMessageId = (Date.now() + 1).toString();

        setMessages(prev => [...prev, { id: botMessageId, role: 'model', text: '', timestamp: new Date() }]);

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            fullResponse += decoder.decode(value, { stream: true });
            
            setMessages(prev => prev.map(msg => 
                msg.id === botMessageId ? { ...msg, text: fullResponse } : msg
            ));
        }
    } catch (error) {
        // ... tratamento de erro
    } finally {
        setLoading(false);
    }
};

// O resto do componente Chat.tsx permanece igual