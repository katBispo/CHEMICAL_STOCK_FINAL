import React, { useState } from 'react';
import { Box, Modal, Typography, IconButton, Button, TextField } from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import jsPDF from 'jspdf';

const AnaliseDetailOverlay = ({ open, onClose, analise }) => {
    const [quantidadeEtiquetas, setQuantidadeEtiquetas] = useState(1);

    // Função para gerar o PDF com as etiquetas
    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        // Margens e dimensões para o quadrado da etiqueta
        const squareWidth = 80;
        const squareHeight = 60;
        const margin = 10;
        let x = 10;
        let y = 10;

        for (let i = 0; i < quantidadeEtiquetas; i++) {
            // Desenha o quadrado
            doc.rect(x, y, squareWidth, squareHeight);

            // Adiciona informações dentro do quadrado
            doc.text(`Nome: ${analise.nome}`, x + 5, y + 10);
            doc.text(`Data: ${analise.prazoFinalizacao}`, x + 5, y + 20);
            doc.text(`Cliente: ${analise.contrato ? analise.contrato.nomeContrato : ''}`, x + 5, y + 30);
            doc.text(`Matriz: ${analise.matriz ? analise.matriz.nomeMatriz : 'N/A'}`, x + 5, y + 40);
            doc.text(`Analito: ${analise.analito}`, x + 5, y + 50);
            doc.text(`Qtd Amostras: ${analise.qtdAmostras}`, x + 5, y + 60);

            // Ajuste para criar uma nova linha de etiquetas
            x += squareWidth + margin;
            if (x + squareWidth > doc.internal.pageSize.width) {
                x = 10;
                y += squareHeight + margin;
                if (y + squareHeight > doc.internal.pageSize.height) {
                    doc.addPage();  // Adiciona uma nova página se não houver mais espaço
                    x = 10;
                    y = 10;
                }
            }
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

                <Box mt={3} display="flex" alignItems="center">
                    <TextField
                        label="Quantidade de Etiquetas"
                        type="number"
                        value={quantidadeEtiquetas}
                        onChange={(e) => setQuantidadeEtiquetas(parseInt(e.target.value) || 1)}
                        sx={{ mr: 2 }}
                    />
                    <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
                        Baixar Etiquetas
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AnaliseDetailOverlay;
