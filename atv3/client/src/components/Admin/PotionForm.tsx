import { useState, FormEvent } from 'react';
import type { Potion } from '../../types';
import { apiService } from '../../services/api';
import { useNotification } from '../../contexts/NotificationContext';

interface PotionFormProps {
  onPotionAdded?: () => void;
}

const PotionForm = ({ onPotionAdded }: PotionFormProps) => {
  const { addNotification } = useNotification();
  const [formData, setFormData] = useState<Omit<Potion, 'id'>>({
    nome: '',
    descricao: '',
    imagemUrl: '',
    preco: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.descricao.trim()) {
      newErrors.descricao = 'Descrição é obrigatória';
    }

    if (!formData.imagemUrl.trim()) {
      newErrors.imagemUrl = 'URL da imagem é obrigatória';
    } else if (!formData.imagemUrl.match(/^https?:\/\/.+/)) {
      newErrors.imagemUrl = 'URL deve começar com http:// ou https://';
    }

    if (formData.preco <= 0) {
      newErrors.preco = 'Preço deve ser maior que zero';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await apiService.createPotion(formData);
      addNotification('Poção cadastrada com sucesso!', 'success');

      // Reset form
      setFormData({
        nome: '',
        descricao: '',
        imagemUrl: '',
        preco: 0,
      });
      setErrors({});

      if (onPotionAdded) {
        onPotionAdded();
      }
    } catch (error) {
      console.error('Erro ao cadastrar poção:', error);
      addNotification('Erro ao cadastrar poção. Tente novamente.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="potion-form-container">
      <h2>Cadastrar Nova Poção</h2>
      <form onSubmit={handleSubmit} className="potion-form">
        <div className="form-group">
          <label htmlFor="nome">Nome *</label>
          <input
            type="text"
            id="nome"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            className={errors.nome ? 'error' : ''}
          />
          {errors.nome && <span className="error-message">{errors.nome}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição *</label>
          <textarea
            id="descricao"
            rows={4}
            value={formData.descricao}
            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
            className={errors.descricao ? 'error' : ''}
          />
          {errors.descricao && <span className="error-message">{errors.descricao}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="imagemUrl">URL da Imagem *</label>
          <input
            type="text"
            id="imagemUrl"
            value={formData.imagemUrl}
            onChange={(e) => setFormData({ ...formData, imagemUrl: e.target.value })}
            className={errors.imagemUrl ? 'error' : ''}
            placeholder="https://exemplo.com/imagem.jpg"
          />
          {errors.imagemUrl && <span className="error-message">{errors.imagemUrl}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="preco">Preço (R$) *</label>
          <input
            type="number"
            id="preco"
            step="0.01"
            min="0"
            value={formData.preco || ''}
            onChange={(e) => setFormData({ ...formData, preco: parseFloat(e.target.value) || 0 })}
            className={errors.preco ? 'error' : ''}
          />
          {errors.preco && <span className="error-message">{errors.preco}</span>}
        </div>

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar Poção'}
        </button>
      </form>
    </div>
  );
};

export default PotionForm;
