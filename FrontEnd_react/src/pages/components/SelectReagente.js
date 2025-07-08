import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Autocomplete,
    Button,
    Box,
    DialogActions,
    IconButton,
    List,
    ListItem,
    ListItemText
} from '@mui/material';

import { Add, Delete } from '@mui/icons-material';
import { listarReagentes } from '../../services/reagenteService.js';
function SelectReagente({ open, onClose, onSave }) {
    const [reagentesDisponiveis, setReagentesDisponiveis] = useState([]);
    const [selecionados, setSelecionados] = useState([]);

    useEffect(() => {
        // Carrega os reagentes do backend
        fetch('http://localhost:8080/reagente')
            .then((res) => res.json())
            .then((data) => setReagentesDisponiveis(data))
            .catch((error) => console.error('Erro ao buscar reagentes:', error));
    }, []);

    const handleSelecionar = (reagente) => {
        const jaSelecionado = selecionados.find((item) => item.reagente.id === reagente.id);
        if (!jaSelecionado) {
            setSelecionados([...selecionados, { reagente, quantidade: 1 }]);
        }
    };

    const handleQuantidadeChange = (index, novaQuantidade) => {
        const novos = [...selecionados];
        novos[index].quantidade = Number(novaQuantidade);
        setSelecionados(novos);
    };

    const handleSalvar = () => {
        onSave(selecionados); // Envia para o componente pai
        onClose(); // Fecha o modal
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Selecionar Reagentes</DialogTitle>
            <DialogContent>
                <List>
                    {reagentesDisponiveis.map((reagente) => (
                        <ListItem key={reagente.id} button onClick={() => handleSelecionar(reagente)}>
                            <ListItemText primary={reagente.nome} />
                        </ListItem>
                    ))}
                </List>

                <h4>Selecionados:</h4>
                {selecionados.map((item, index) => (
                    <div key={item.reagente.id}>
                        {item.reagente.nome}
                        <TextField
                            label="Quantidade"
                            type="number"
                            value={item.quantidade}
                            onChange={(e) => handleQuantidadeChange(index, e.target.value)}
                            style={{ marginLeft: '10px', width: '100px' }}
                        />
                    </div>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSalvar} variant="contained" color="primary">
                    Salvar Seleção
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SelectReagente;