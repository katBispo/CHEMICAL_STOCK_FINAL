// ProcedimentoExcluirOverlay.js
import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';

const ProcedimentoExcluirOverlay = ({ open, onClose, onDelete, procedimento }) => {
    const handleDelete = () => {
        if (onDelete && typeof onDelete === 'function') {
            onDelete(procedimento.id); // Passa o ID do procedimento para a função de delete
        }
        onClose(); // Fecha o overlay após a exclusão
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" component="h2">
                    Confirmar Exclusão
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Você tem certeza que deseja excluir o procedimento "{procedimento.nome}"?
                </Typography>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="outlined" color="primary" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button variant="contained" color="error" onClick={handleDelete} sx={{ ml: 2 }}>
                        Excluir
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ProcedimentoExcluirOverlay;
