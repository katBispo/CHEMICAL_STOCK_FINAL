import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';

const AmostraExcluirOverlay = ({ open, onClose, onDelete, amostra }) => {
    const handleDelete = () => {
        if (amostra && amostra.id) {
            if (onDelete && typeof onDelete === 'function') {
                onDelete(amostra.id); // Passa o ID da amostra para a função de delete
            }
            onClose(); // Fecha o overlay após a exclusão
            window.location.reload(); // Recarrega a página para refletir as mudanças
        } else {
            console.error('Amostra inválida ou ID ausente.');
        }
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
                    {amostra ? `Você tem certeza que deseja excluir a amostra "${amostra.nome}"?` : 'Nenhuma amostra selecionada.'}
                </Typography>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="outlined" color="primary" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                        sx={{ ml: 2 }}
                        disabled={!amostra || !amostra.id} // Desabilita se amostra for inválida
                    >
                        Excluir
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AmostraExcluirOverlay;
