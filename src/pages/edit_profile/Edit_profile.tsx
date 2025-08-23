import React, { useState, useEffect } from "react";
import "./Edit_profile.css";

const EditProfile = () => {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    // Simulação de dados carregados
    const dadosUsuario = {
      nomeCompleto: "Paulo Henrique",
      email: "paulo@email.com",
      telefone: "(83) 99999-9999",
      cep: "58930-000",
      endereco: "Rua das Palmeiras, 123",
    };

    setNomeCompleto(dadosUsuario.nomeCompleto);
    setEmail(dadosUsuario.email);
    setTelefone(dadosUsuario.telefone);
    setCep(dadosUsuario.cep);
    setEndereco(dadosUsuario.endereco);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nomeCompleto || !email || !telefone || !cep || !endereco) {
      setMensagem("Por favor, preencha todos os campos.");
      return;
    }

    setMensagem("Informações atualizadas com sucesso!");
  };

  return (
    <div className="edit-profile-container">
      <h2 className="edit-profile-title">Editar Informações</h2>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <label>
          Nome Completo:
          <input
            type="text"
            value={nomeCompleto}
            onChange={(e) => setNomeCompleto(e.target.value)}
          />
        </label>
        <label>
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Telefone:
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </label>
        <label>
          CEP:
          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />
        </label>
        <label>
          Endereço:
          <input
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
        </label>
        <button type="submit" className="save-button">
          Salvar
        </button>
        {mensagem && <p className="form-message">{mensagem}</p>}
      </form>
    </div>
  );
};

export default EditProfile;
