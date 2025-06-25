import  { forwardRef, useImperativeHandle, useState } from 'react';
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
};

export const AlertModal = forwardRef<AlertModalHandle, AlertModalProps>(
  ({ text = '', type = 'success' }, ref) => {
    const [isVisible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      setVisible: () => setVisible(true),
    }));

    if (!isVisible) return null;

    return (
      <div className="modal-overlay" onClick={() => setVisible(false)}>
        <ThemedView variant="card" style={{ padding: 24, minWidth: 300 }}>
          <ThemedText type="title" style={{ marginBottom: 16 }}>
            {type === 'fail' ? 'Erro' : 'Sucesso'}
          </ThemedText>
          <ThemedText>{text}</ThemedText>
          <ThemedButton style={{ marginTop: 24 }} onClick={() => setVisible(false)}>
            <ThemedText lightColor="white">Fechar</ThemedText>
          </ThemedButton>
        </ThemedView>
      </div>
    );
  }
);
