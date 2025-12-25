import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Calendar as CalendarIcon, Clock, CreditCard, Wallet, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { LASH_MODELS } from '../constants';
import { LashModel } from '../types';

export default function Booking() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<LashModel | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const times = ["09:00", "11:00", "14:00", "16:30", "18:00"];
  const lashModels = LASH_MODELS.filter(model => model.price); // Exibe apenas modelos com preço definido
  const paymentMethods = [
    { id: 'pix', label: 'PIX' },
    { id: 'credito', label: 'Crédito' },
    { id: 'debito', label: 'Débito' },
    { id: 'dinheiro', label: 'Dinheiro' }
  ];

  const weeks = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(newDate);
    // Reseta seleções seguintes para um novo fluxo
    setSelectedTime(null);
    setSelectedModel(null);
    setPaymentMethod(null);
  };
  
  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    // Reseta seleções seguintes
    setSelectedModel(null);
    setPaymentMethod(null);
  }

  const handleModelClick = (model: LashModel) => {
    setSelectedModel(model);
    // Reseta seleção seguinte
    setPaymentMethod(null);
  }

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return selectedDate.getDate() === day && 
           selectedDate.getMonth() === currentMonth.getMonth() && 
           selectedDate.getFullYear() === currentMonth.getFullYear();
  };

  const handleBooking = () => {
    if (selectedDate && selectedTime && selectedModel && paymentMethod) {
      const formattedDate = selectedDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
      const text = `Olá Rebecca, gostaria de confirmar um agendamento:\n\n*Modelo:* ${selectedModel.name}\n*Dia:* ${formattedDate}\n*Horário:* ${selectedTime}\n*Pagamento:* ${paymentMethod}`;
      const encodedText = encodeURIComponent(text);
      window.open(`https://wa.me/5513997002356?text=${encodedText}`, '_blank');
    }
  };

  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    // Empty slots for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8 md:h-10 md:w-10"></div>);
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;
      const selected = isSelected(day);

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center text-sm transition-all
            ${selected 
              ? 'bg-havilah-gold text-havilah-black font-bold shadow-lg shadow-havilah-gold/20 scale-110' 
              : 'text-havilah-champagne hover:bg-havilah-gold/10'}
            ${isToday && !selected ? 'border border-havilah-gold/30' : ''}
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className="animate-fade-in max-w-2xl mx-auto pb-10 space-y-6">
      <header className="mb-2">
        <h1 className="font-serif text-3xl text-havilah-gold mb-2">Agendar Horário</h1>
        <p className="text-havilah-champagne/60">Siga os passos para o seu ritual de beleza.</p>
      </header>

      {/* Calendar Section */}
      <div className="bg-havilah-card border border-havilah-gold/10 p-4 md:p-6 rounded-xl shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="flex items-center gap-2 text-havilah-white font-medium text-lg">
            <CalendarIcon size={18} className="text-havilah-gold" /> 
            {capitalize(currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }))}
          </h3>
          <div className="flex gap-2">
            <button onClick={handlePrevMonth} className="p-2 hover:bg-havilah-gold/10 rounded-full text-havilah-gold transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button onClick={handleNextMonth} className="p-2 hover:bg-havilah-gold/10 rounded-full text-havilah-gold transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="mb-2 grid grid-cols-7 text-center">
          {weeks.map(day => (
            <span key={day} className="text-[10px] md:text-xs text-havilah-gold/60 uppercase tracking-wider font-medium py-2">
              {day}
            </span>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-y-2 justify-items-center">
          {renderCalendarDays()}
        </div>
      </div>

      {/* Time Section */}
      {selectedDate && (
        <div className="bg-havilah-card border border-havilah-gold/10 p-5 md:p-6 rounded-xl shadow-md animate-fade-in">
          <h3 className="flex items-center gap-2 text-havilah-white font-medium mb-4">
            <Clock size={18} className="text-havilah-gold" /> Selecione o Horário
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {times.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeClick(time)}
                className={`py-3 md:py-2 px-3 rounded-lg text-sm transition-all border font-medium
                  ${selectedTime === time
                    ? 'bg-havilah-gold text-havilah-black border-havilah-gold shadow-md transform scale-105'
                    : 'bg-havilah-darkGray border-havilah-gold/10 text-havilah-champagne hover:border-havilah-gold/30'}`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Lash Model Section */}
      {selectedDate && selectedTime && (
        <div className="bg-havilah-card border border-havilah-gold/10 p-5 md:p-6 rounded-xl shadow-md animate-fade-in">
           <h3 className="flex items-center gap-2 text-havilah-white font-medium mb-4">
              <Sparkles size={18} className="text-havilah-gold" /> Escolha o Modelo
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lashModels.map((model) => (
                 <button
                    key={model.id}
                    onClick={() => handleModelClick(model)}
                    className={`p-4 rounded-lg text-left transition-all border flex justify-between items-center
                    ${selectedModel?.id === model.id
                       ? 'bg-havilah-gold text-havilah-black border-havilah-gold shadow-md'
                       : 'bg-havilah-darkGray border-havilah-gold/10 text-havilah-champagne hover:border-havilah-gold/30'}`}
                 >
                    <span className="font-medium text-sm">{model.name}</span>
                    <span className="text-xs font-bold opacity-80">R$ {model.price}</span>
                 </button>
              ))}
           </div>
        </div>
      )}

      {/* Payment Section */}
      {selectedDate && selectedTime && selectedModel && (
        <div className="bg-havilah-card border border-havilah-gold/10 p-5 md:p-6 rounded-xl shadow-md animate-fade-in">
          <h3 className="flex items-center gap-2 text-havilah-white font-medium mb-4">
            <Wallet size={18} className="text-havilah-gold" /> Forma de Pagamento
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.label)}
                className={`py-3 px-4 rounded-lg text-sm transition-all border flex items-center justify-center gap-2 font-medium
                  ${paymentMethod === method.label
                    ? 'bg-havilah-gold text-havilah-black border-havilah-gold shadow-md'
                    : 'bg-havilah-darkGray border-havilah-gold/10 text-havilah-champagne hover:border-havilah-gold/30'}`}
              >
                <CreditCard size={14} />
                {method.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <Button fullWidth onClick={handleBooking} disabled={!selectedDate || !selectedTime || !selectedModel || !paymentMethod}>
          Confirmar e Agendar no WhatsApp
        </Button>
      </div>
    </div>
  );
};
