import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    Box,
} from "@mui/material";

import { getReagentes } from "../../services/reagenteService.js";

function SelectReagente({ open, onClose, onSave }) {
    const [reagentesDisponiveis, setReagentesDisponiveis] = useState([]);
    const [selecionados, setSelecionados] = useState([]);

    useEffect(() => {
        // Busca reagentes do backend via service
        const fetchReagentes = async () => {
            try {
                const data = await getReagentes();
                console.log("Reagentes carregados:", data);
                setReagentesDisponiveis(data);
            } catch (error) {
                console.error("Erro ao buscar reagentes:", error);
            }
        };

        fetchReagentes();
    }, []);

    const handleSelecionar = (reagente) => {
        const jaSelecionado = selecionados.find(
            (item) => item.reagente.id === reagente.id
        );
        if (!jaSelecionado) {
            setSelecionados([...selecionados, { reagente, quantidade: 1 }]);
        }
    };

    const handleQuantidadeChange = (index, novaQuantidade) => {
        const novos = [...selecionados];
        novos[index].quantidade = Number(novaQuantidade);
        setSelecionados(novos);
    };

    const handleRemover = (id) => {
        setSelecionados(selecionados.filter((item) => item.reagente.id !== id));
    };

    const handleSalvar = () => {
        onSave(selecionados); // Envia para o componente pai
        onClose(); // Fecha o modal
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Selecionar Reagentes</DialogTitle>
            <DialogContent>
                {/* Lista de Reagentes Disponíveis */}
                <h4>Reagentes Disponíveis:</h4>
                <List sx={{ maxHeight: 200, overflowY: "auto", border: "1px solid #ccc", borderRadius: 2, mb: 2 }}>
                    {reagentesDisponiveis.map((reagente) => (
                        <ListItem
                            key={reagente.id}
                            button
                            onClick={() => handleSelecionar(reagente)}
                        >
                            <ListItemText
                                primary={reagente.nome}
                                secondary={`Tipo: ${reagente.tipo || "N/A"} | Unidade: ${reagente.unidadeReagente || "N/A"}`}
                            />
                        </ListItem>
                    ))}
                </List>

                {/* Reagentes Selecionados */}
                <h4>Selecionados:</h4>
                {selecionados.length === 0 && (
                    <p style={{ color: "#777" }}>Nenhum reagente selecionado.</p>
                )}
                {selecionados.map((item, index) => (
                    <Box
                        key={item.reagente.id}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ mb: 1, borderBottom: "1px solid #eee", pb: 1 }}
                    >
                        <span>{item.reagente.nome}</span>
                        <Box display="flex" alignItems="center">
                            <TextField
                                label="Quantidade"
                                type="number"
                                value={item.quantidade}
                                onChange={(e) => handleQuantidadeChange(index, e.target.value)}
                                size="small"
                                sx={{ width: 100, mr: 2 }}
                            />
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => handleRemover(item.reagente.id)}
                            >
                                Remover
                            </Button>
                        </Box>
                    </Box>
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

// Validação das props
SelectReagente.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default SelectReagente;
