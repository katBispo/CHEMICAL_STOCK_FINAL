import React, { useState } from 'react';
import { Box, Modal, Typography, IconButton, Button, TextField } from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import jsPDF from 'jspdf';

const AnaliseDetailOverlay = ({ open, onClose, analise }) => {
    const [showLabelField, setShowLabelField] = useState(false);
    const [labelCount, setLabelCount] = useState(1);

    // Função para gerar o PDF com etiquetas duplicadas
    const handleDownloadLabels = () => {
        const doc = new jsPDF();
        for (let i = 0; i < labelCount; i++) {
            doc.setFontSize(12);
            doc.text(`Nome: ${analise.nome}`, 10, 10 + i * 30);
            doc.text(`Data: ${analise.prazoFinalizacao}`, 10, 20 + i * 30);
            doc.text(`Cliente: ${analise.contrato ? analise.contrato.nomeContrato : ''}`, 10, 30 + i * 30);
            doc.text(`Matriz: ${analise.matriz ? analise.matriz.nomeMatriz : 'N/A'}`, 10, 40 + i * 30);
            doc.text(`Analito: ${analise.analito}`, 10, 50 + i * 30);
            doc.text(`Quantidade de Amostras: ${analise.qtdAmostras}`, 10, 60 + i * 30);
            doc.text(`Status: ${analise.status}`, 10, 70 + i * 30);
            
            // Adiciona uma nova página se não for a última etiqueta
            if (i < labelCount - 1) doc.addPage();
        }
        doc.save('etiquetas.pdf');
    };

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
                        Detalhes da Análise
                    </Typography>
                    <IconButton onClick={onClose}>
                        <FaTimes style={{ color: '#666', fontSize: '20px' }} />
                    </IconButton>
                </Box>

                <Typography variant="body1">
                    <strong>Nome:</strong> {analise.nome}
                </Typography>
                <Typography variant="body1">
                    <strong>Data:</strong> {analise.prazoFinalizacao}
                </Typography>
                <Typography variant="body1">
                    <strong>Cliente:</strong> {analise.contrato ? analise.contrato.nomeContrato : ''}
                </Typography>
                <Typography variant="body1">
                    <strong>Matriz:</strong> {analise.matriz ? analise.matriz.nomeMatriz : 'N/A'}
                </Typography>
                <Typography variant="body1">
                    <strong>Analito:</strong> {analise.analito}
                </Typography>
                <Typography variant="body1">
                    <strong>Quantidade de Amostras:</strong> {analise.qtdAmostras}
                </Typography>
                <Typography variant="body1">
                    <strong>Status:</strong> {analise.status}
                </Typography>

                {/* Botão para abrir o campo de quantidade de etiquetas */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setShowLabelField(!showLabelField)}
                    sx={{ mt: 2 }}
                >
                    Baixar Etiquetas
                </Button>

                {/* Campo para escolher a quantidade de etiquetas */}
                {showLabelField && (
                    <Box mt={2} display="flex" alignItems="center">
                        <TextField
                            label="Quantidade de Etiquetas"
                            type="number"
                            value={labelCount}
                            onChange={(e) => setLabelCount(e.target.value)}
                            InputProps={{ inputProps: { min: 1 } }}
                            sx={{ mr: 2 }}
                        />
                        <Button variant="contained" color="secondary" onClick={handleDownloadLabels}>
                            Gerar PDF
                        </Button>
                    </Box>
                )}
            </Box>
        </Modal>
    );
};

export default AnaliseDetailOverlay;
