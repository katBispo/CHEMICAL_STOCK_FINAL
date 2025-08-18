import React, { useState, useEffect } from 'react';
import { Box, Modal, Typography, IconButton, Button, TextField } from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import jsPDF from 'jspdf';

const AnaliseDetailOverlay = ({ open, onClose, analise }) => {
    const [quantidadeEtiquetas, setQuantidadeEtiquetas] = useState(1);
    const [quantidadeAmostras, setQuantidadeAmostras] = useState(0);

    useEffect(() => {
        if (analise?.id) {
            fetch(`http://localhost:8080/analise/${analise.id}/quantidade-amostras`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`Erro HTTP: ${res.status} ${res.statusText}`);
                    }
                    return res.json();
                })
                .then(qtd => setQuantidadeAmostras(qtd))
                .catch(err => {
                    console.error("Erro ao buscar quantidade de amostras:", err.message);
                    setQuantidadeAmostras(0);
                });
        }
    }, [analise]);

    const handleDownloadPDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const labelWidth = 60; // Tamanho reduzido para estética
        const labelHeight = 100;
        const margin = 5;
        let x = margin;
        let y = margin;

        for (let i = 0; i < quantidadeEtiquetas; i++) {
            // Fundo verde com borda
            doc.setFillColor(40, 167, 69); // #28a745
            doc.setDrawColor(0, 0, 0); // Borda preta
            doc.setLineWidth(0.5);
            doc.rect(x, y, labelWidth, labelHeight, 'FD');

            // Cabeçalho estilizado
            doc.setTextColor(255, 255, 255);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(16);
            doc.text('conforlab', x + labelWidth / 2, y + 10, { align: 'center' });

            // Campos organizados
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            const fields = [
                { label: 'Nº Pedido', value: analise.id?.toString() || 'N/A' },
                { label: 'Cliente', value: analise.contrato?.nomeContrato?.toString() || 'N/A' },
                { label: 'Coleta', value: analise.localColeta?.toString() || 'N/A' },
                { label: 'Coletor', value: analise.coletor?.toString() || 'N/A' },
                { label: 'Data', value: analise.dataCadastro?.toString() || 'N/A' },
                { label: 'Hora', value: analise.horaColeta?.toString() || 'N/A' },
                { label: 'Matriz', value: analise.matriz?.nomeMatriz?.toString() || 'N/A' },
                { label: 'Qtd Amostras', value: quantidadeAmostras?.toString() || '0' }
            ];

            fields.forEach((field, index) => {
                doc.text(field.label + ':', x + 5, y + 20 + (index * 10));
                doc.text(field.value, x + labelWidth - 5, y + 20 + (index * 10), { align: 'right' });
            });

            // Linha divisória
            doc.setDrawColor(255, 255, 255);
            doc.line(x + 5, y + 15, x + labelWidth - 5, y + 15);

            // Ajuste para nova etiqueta
            x += labelWidth + margin;
            if (x + labelWidth > doc.internal.pageSize.width - margin) {
                x = margin;
                y += labelHeight + margin;
                if (y + labelHeight > doc.internal.pageSize.height - margin) {
                    doc.addPage();
                    x = margin;
                    y = margin;
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
                    <strong>Nome:</strong> {analise.nome || 'N/A'}
                </Typography>
                <Typography variant="body1">
                    <strong>Data de Cadastro:</strong> {analise.dataCadastro || 'N/A'}
                </Typography>
                <Typography variant="body1">
                    <strong>Cliente:</strong> {analise.nomeCliente || 'N/A'}
                </Typography>
                <Typography variant="body1">
                    <strong>Matriz:</strong> {analise.nomeMatriz || 'N/A'}
                </Typography>
                <Typography variant="body1">
                    <strong>Analitos:</strong> {analise.analitos ? analise.analitos.join(', ') : 'N/A'}
                </Typography>
                <Typography variant="body1">
                    <strong>Quantidade de Amostras:</strong> {quantidadeAmostras}
                </Typography>
                <Typography variant="body1">
                    <strong>Status:</strong> {analise.statusAnalise || 'N/A'}
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