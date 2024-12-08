import React, { useState,useEffect } from 'react';
import { Box, Modal, Typography, IconButton, Button, TextField,Autocomplete } from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import jsPDF from 'jspdf';

const ContratoDetailOverlay = ({ open, onClose, contratos }) => {
    const [quantidadeGuiasContrato, setQuantidadeGuiasContrato] = useState(1);

    // Função para gerar o PDF com as etiquetas
    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        // Margens e dimensões para o quadrado da etiqueta
        const squareWidth = 80;
        const squareHeight = 60;
        const margin = 10;
        let x = 10;
        let y = 10;

        for (let i = 0; i < quantidadeGuiasContrato; i++) {
            // Desenha o quadrado
            doc.rect(x, y, squareWidth, squareHeight);

            // Adiciona informações dentro do quadrado
            doc.text(`Número Contrato: ${contratos.numeroContrato}`, x + 5, y + 10);
            doc.text(`Nome Contrato: ${contratos.nomeContrato}`, x + 5, y + 20);
            doc.text(`Data Contrato: ${contratos.dataContrato}`, x + 5, y + 30);
            doc.text(`Data Entrega: ${contratos.dataEntrega}`, x + 5, y + 40);
            doc.text(`Qtd Análises: ${contratos.quantidadeAnalises}`, x + 5, y + 50);
            doc.text(`Observação: ${contratos.observacao || 'N/A'}`, x + 5, y + 60);
            doc.text(`Status Contrato: ${contratos.statusContrato}`, x + 5, y + 70);
            doc.text(`Cliente: ${contratos.cliente ? contratos.cliente.id : 'N/A'}`, x + 5, y + 80);


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

        doc.save('contrato_guia.pdf');
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
                        Detalhes do Contrato
                    </Typography>
                    <IconButton onClick={onClose}>
                        <FaTimes style={{ color: '#666', fontSize: '20px' }} />
                    </IconButton>
                </Box>

                <Typography variant="body1">
                    <strong>Número do Contrato:</strong> {contratos.numeroContrato}
                </Typography>
                <Typography variant="body1">
                    <strong>Nome do Contrato:</strong> {contratos.nomeContrato}
                </Typography>
                <Typography variant="body1">
                    <strong>Data do Contrato:</strong> {contratos.dataContrato}
                </Typography>
                <Typography variant="body1">
                    <strong>Data de Entrega:</strong> {contratos.dataEntrega}
                </Typography>
                <Typography variant="body1">
                    <strong>Quantidade de Análises:</strong> {contratos.quantidadeAnalises}
                </Typography>
                <Typography variant="body1">
                    <strong>Observação:</strong> {contratos.observacao || 'N/A'}
                </Typography>
                <Typography variant="body1">
                    <strong>Status do Contrato:</strong> {contratos.statusContrato}
                </Typography>
                <Typography variant="body1">
                    <strong>Cliente:</strong> {contratos.cliente ? contratos.cliente.id : 'N/A'}
                </Typography>


                <Box mt={3} display="flex" alignItems="center">
                    <TextField
                        label="Quantidade de Guias"
                        type="number"
                        value={quantidadeGuiasContrato}
                        onChange={(e) => setQuantidadeGuiasContrato(parseInt(e.target.value) || 1)}
                        sx={{ mr: 2 }}
                    />
                    <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
                        Baixar Guias
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ContratoDetailOverlay;
