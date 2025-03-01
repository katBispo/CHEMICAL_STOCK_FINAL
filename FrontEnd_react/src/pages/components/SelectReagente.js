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
    const [reagentes, setReagentes] = useState([]);
    const [reagenteSelecionado, setReagenteSelecionado] = useState(null);
    const [quantidade, setQuantidade] = useState('');
    const [listaReagentes, setListaReagentes] = useState([]); // Lista de reagentes selecionados (id e quantidade)

    // Carregar reagentes ao abrir o modal
    useEffect(() => {
        if (open) {
            const carregarDados = async () => {
                try {
                    const dadosReagentes = await listarReagentes();
                    setReagentes(dadosReagentes);
                } catch (error) {
                    console.error('Erro ao carregar dados:', error);
                }
            };
            carregarDados();
        }
    }, [open]);

    // Adicionar reagente à lista (agora apenas ID e quantidade)
    const handleAdicionarReagente = () => {
        if (reagenteSelecionado && quantidade) {
            // Armazenar apenas id do reagente e a quantidade
            setListaReagentes([
                ...listaReagentes,
                { id: reagenteSelecionado.id, quantidade }
            ]);
            // Resetar os campos
            setReagenteSelecionado(null);
            setQuantidade('');
        }
    };

    // Remover reagente da lista
    const handleRemoverReagente = (index) => {
        setListaReagentes((prevLista) => prevLista.filter((_, i) => i !== index));
    };

    // Salvar reagentes selecionados (passando apenas id e quantidade para o componente pai)
    const handleSave = () => {
        if (listaReagentes.length > 0 && typeof onSave === 'function') {
            // Criar um array com id do reagente e a quantidade
            const reagentesComIdEQuantidade = listaReagentes.map(item => ({
                idReagente: item.id,
                quantidade: item.quantidade
            }));
            onSave(reagentesComIdEQuantidade); // Passa para o componente pai
        } else {
            console.warn('onSave não foi passado como função.');
        }
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Selecionar Reagentes</DialogTitle>
            <DialogContent>
                <Box display="flex" gap={2} alignItems="center" marginBottom={2}>
                    <Autocomplete
                        options={reagentes}
                        getOptionLabel={(option) => option.nome}
                        onChange={(event, newValue) => setReagenteSelecionado(newValue)}
                        value={reagenteSelecionado}
                        renderInput={(params) => <TextField {...params} label="Reagentes Cadastrados" />}
                        fullWidth
                    />
                    <TextField
                        label="Quantidade"
                        type="number"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        variant="outlined"
                        sx={{ width: '100px' }}
                    />
                    <IconButton color="primary" onClick={handleAdicionarReagente} disabled={!reagenteSelecionado || !quantidade}>
                        <Add />
                    </IconButton>
                </Box>

                {/* Lista de reagentes adicionados */}
                <List>
                    {listaReagentes.map((item, index) => {
                        // Buscar o nome do reagente pelo ID na lista original de reagentes
                        const reagenteEncontrado = reagentes.find(r => r.id === item.id);

                        return (
                            <ListItem key={index} secondaryAction={
                                <IconButton edge="end" color="error" onClick={() => handleRemoverReagente(index)}>
                                    <Delete />
                                </IconButton>
                            }>
                                <ListItemText primary={`${reagenteEncontrado ? reagenteEncontrado.nome : 'Desconhecido'} - ${item.quantidade}`} />
                            </ListItem>
                        );
                    })}
                </List>

            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleSave} disabled={listaReagentes.length === 0}>
                    Salvar
                </Button>
                <Button variant="outlined" color="secondary" onClick={onClose}>
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

// Definição de tipos das props para evitar erros
SelectReagente.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func
};

// Valor padrão para `onSave`, caso não seja passado
SelectReagente.defaultProps = {
    onSave: () => console.warn('onSave não foi passado.')
};

export default SelectReagente;