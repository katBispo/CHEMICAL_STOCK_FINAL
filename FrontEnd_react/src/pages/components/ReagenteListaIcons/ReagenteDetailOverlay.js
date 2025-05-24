import React, { useState } from 'react';
import { Modal, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import jsPDF from 'jspdf';

const ReagenteDetailOverlay = ({ open, onClose, reagente }) => {
    const [quantidadeEtiquetas, setQuantidadeEtiquetas] = useState(1);

    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        const squareWidth = 80;
        const squareHeight = 60;
        const margin = 10;
        let x = 10;
        let y = 10;

        for (let i = 0; i < quantidadeEtiquetas; i++) {
            doc.rect(x, y, squareWidth, squareHeight);

            doc.text(`Nome: ${reagente.nome}`, x + 5, y + 10);
            doc.text(`Marca: ${reagente.marca || 'N/A'}`, x + 5, y + 20);
            doc.text(`Lote: ${reagente.lote}`, x + 5, y + 30);
            doc.text(`Validade: ${reagente.dataValidade}`, x + 5, y + 40);
            doc.text(`Controlado: ${reagente.controlado ? 'Sim' : 'Não'}`, x + 5, y + 50);
            if (reagente.controlado && reagente.numeroControlado) {
                doc.text(`Nº Controlado: ${reagente.numeroControlado}`, x + 5, y + 60);
            }

            x += squareWidth + margin;
            if (x + squareWidth > doc.internal.pageSize.width) {
                x = 10;
                y += squareHeight + margin;
                if (y + squareHeight > doc.internal.pageSize.height) {
                    doc.addPage();
                    x = 10;
                    y = 10;
                }
            }
        }

        doc.save('etiquetas_reagente.pdf');
    };

    if (!reagente) return null;

    return (
        <Modal open={open} onClose={onClose}>
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
                        Detalhes do Reagente
                    </Typography>
                    <IconButton onClick={onClose}>
                        <FaTimes style={{ color: '#666', fontSize: '20px' }} />
                    </IconButton>
                </Box>

                <Typography variant="body1"><strong>Nome:</strong> {reagente.nome}</Typography>
                <Typography variant="body1"><strong>Marca:</strong> {reagente.marca || 'N/A'}</Typography>
                <Typography variant="body1"><strong>Lote:</strong> {reagente.lote}</Typography>
                <Typography variant="body1"><strong>Data de Validade:</strong> {reagente.dataValidade}</Typography>
                <Typography variant="body1"><strong>Controlado:</strong> {reagente.controlado ? 'Sim' : 'Não'}</Typography>
                {reagente.controlado && reagente.numeroControlado && (
                    <Typography variant="body1"><strong>Nº Controlado:</strong> {reagente.numeroControlado}</Typography>
                )}
                <Typography variant="body1"><strong>Tipo:</strong> {reagente.tipo}</Typography>
                <Typography variant="body1"><strong>Unidade:</strong> {reagente.unidadeReagente}</Typography>

                <Box mt={3} display="flex" alignItems="center">
                    <TextField
                        label="Quantidade de Etiquetas"
                        type="number"
                        value={quantidadeEtiquetas}
                        onChange={(e) => setQuantidadeEtiquetas(parseInt(e.target.value) || 1)}
                        sx={{ mr: 2 }}
                        inputProps={{ min: 1 }}
                    />
                    <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
                        Baixar Etiquetas
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ReagenteDetailOverlay;
