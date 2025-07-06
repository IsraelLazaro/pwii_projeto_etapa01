import { forwardRef, useImperativeHandle, useState } from 'react';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { ThemedButton } from './ThemedButton';
import './AlertModal.css';

export type AlertModalHandle = {
  setVisible: () => void;
};

export type AlertModalProps = {
  text?: string;
  type?: 'fail' | 'success';
  onClose?: () => void; 
};

export const AlertModal = forwardRef<AlertModalHandle, AlertModalProps>(
  ({ text = '', type = 'success', onClose }, ref) => {  
    const [isVisible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      setVisible: () => setVisible(true),
    }));

    const handleClose = () => { 
      setVisible(false);
      onClose?.();        
    };

    if (!isVisible) return null;

    return (
      <div className="modal-overlay" onClick={handleClose}>
        <ThemedView variant="card" style={{ padding: 24, minWidth: 300 }}>
          <ThemedText type="title" style={{ marginBottom: 16 }}>
            {type === 'fail' ? 'Erro' : 'Sucesso'}
          </ThemedText>
          <ThemedText>{text}</ThemedText>
          <ThemedButton style={{ marginTop: 24 }} onClick={handleClose}>
            <ThemedText lightColor="white">Fechar</ThemedText>
          </ThemedButton>
        </ThemedView>
      </div>
    );
  }
);
