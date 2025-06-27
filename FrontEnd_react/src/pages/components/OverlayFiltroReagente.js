import React, { useState } from 'react';

const OverlayFiltroReagente = ({ onApplyFilters, onClose }) => {
    const [filtros, setFiltros] = useState({
        nome: '',
        tipo: '',
        dataInicio: '',
        dataFim: '',
    });

    const handleAplicar = () => {
        onApplyFilters(filtros);  // <- ESSA FUNÇÃO DEVE SER CHAMADA
        onClose(); // fecha o overlay após aplicar
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFiltros((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onApplyFilters(filtros);
        onClose();
    };

    const handleLimpar = () => {
        setFiltros({
            nome: '',
            tipo: '',
            dataInicio: '',
            dataFim: '',
        });
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.card}>
                <h2>Filtrar Reagentes</h2>

                <label>
                    Nome:
                    <input type="text" name="nome" value={filtros.nome} onChange={handleChange} />
                </label>

                <label>
                    Tipo:
                    <select name="tipo" value={filtros.tipo} onChange={handleChange}>
                        <option value="">Todos</option>
                        <option value="SAL">Sal</option>
                        <option value="ACIDO">Ácido</option>
                        <option value="BASE">Base</option>
                        <option value="OXIDO">Óxido</option>
                        <option value="OUTRO">Outro</option>
                    </select>
                </label>

                <label>
                    Data de Início:
                    <input type="date" name="dataInicio" value={filtros.dataInicio} onChange={handleChange} />
                </label>

                <label>
                    Data de Fim:
                    <input type="date" name="dataFim" value={filtros.dataFim} onChange={handleChange} />
                </label>

                <div style={styles.buttons}>
                    <button onClick={handleAplicar}>Aplicar Filtros</button>
                    <button onClick={handleLimpar}>Limpar</button>
                    <button onClick={onClose}>Fechar</button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000
    },
    card: {
        backgroundColor: '#fff', padding: '30px', borderRadius: '10px',
        display: 'flex', flexDirection: 'column', gap: '15px', width: '300px'
    },
    buttons: {
        display: 'flex', justifyContent: 'space-between'
    }
};

export default OverlayFiltroReagente;
