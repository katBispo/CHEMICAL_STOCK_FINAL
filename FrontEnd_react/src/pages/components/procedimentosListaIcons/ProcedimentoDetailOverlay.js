import React, { useState, useEffect } from 'react';
import { Box, Modal, Typography, IconButton, Button } from '@mui/material';
import { FaTimes } from 'react-icons/fa';

const ProcedimentoDetailOverlay = ({ open, onClose, procedimento }) => {
    const [pdfUrl, setPdfUrl] = useState('');

    useEffect(() => {
        if (procedimento && procedimento.pdfData) {
            // Decodifica a string Base64 para binário
            const base64ToArrayBuffer = (base64) => {
                const binaryString = atob(base64); // Decodifica Base64 para string binária
                const len = binaryString.length;
                const bytes = new Uint8Array(len);
                for (let i = 0; i < len; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }
                return bytes.buffer; // Retorna um ArrayBuffer
            };

            const arrayBuffer = base64ToArrayBuffer(procedimento.pdfData);
            const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
        }
    }, [procedimento]);

    const handleClose = () => {
        setPdfUrl(''); // Limpa a URL do PDF ao fechar o modal
        onClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'white',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    outline: 'none',
                    maxWidth: '600px',
                    width: '90%',
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" component="h2">
                        Detalhes do Procedimento
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <FaTimes style={{ color: '#666', fontSize: '20px' }} />
                    </IconButton>
                </Box>

                <Typography variant="body1">
                    <strong>Nome:</strong> {procedimento.nomeProcedimento}
                </Typography>
                <Typography variant="body1">
                    <strong>Descrição:</strong> {procedimento.descricaoProcedimento}
                </Typography>
                
                {/* Exibição do PDF */}
                {pdfUrl ? (
                    <Box mt={2}>
                        <iframe
                            src={pdfUrl}
                            width="100%"
                            height="400px"
                            style={{ border: 'none' }}
                            title="PDF do Procedimento"
                        />
                    </Box>
                ) : (
                    <Typography variant="body1" color="error">Erro ao carregar o PDF.</Typography>
                )}

                <Box mt={3}>
                    <Button variant="contained" color="primary" onClick={() => window.open(pdfUrl)}>
                        Baixar PDF
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ProcedimentoDetailOverlay;
