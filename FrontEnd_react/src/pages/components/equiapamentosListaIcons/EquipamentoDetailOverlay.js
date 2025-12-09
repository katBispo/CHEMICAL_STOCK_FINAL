import React, { useState } from 'react';
import { Box, Modal, Typography, IconButton, Button, TextField } from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import jsPDF from 'jspdf';

const EquipamentoDetailOverlay = ({ open, onClose, equipamento }) => {
    const [quantidadeEtiquetas, setQuantidadeEtiquetas] = useState(1);

    const handleDownloadPDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const labelWidth = 60;
        const labelHeight = 70;
        const margin = 5;
        let x = margin;
        let y = margin;

        for (let i = 0; i < quantidadeEtiquetas; i++) {

            doc.setFillColor(40, 167, 69);
            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(0.5);
            doc.rect(x, y, labelWidth, labelHeight, 'FD');

            doc.setTextColor(255, 255, 255);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(16);
            doc.text('ChemLab', x + labelWidth / 2, y + 10, { align: 'center' });

            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');

            const fields = [
                { label: 'Equipamento', value: equipamento.nome || 'N/A' },
                { label: 'ID', value: equipamento.id?.toString() || 'N/A' },
                { label: 'Fabricante', value: equipamento.fabricante || 'N/A' },
                { label: 'Modelo', value: equipamento.modelo || 'N/A' },
                { label: 'Data Cadastro', value: equipamento.dataCadastro || 'N/A' }
            ];

            fields.forEach((field, index) => {
                doc.text(field.label + ':', x + 5, y + 20 + (index * 10));
                doc.text(field.value, x + labelWidth - 5, y + 20 + (index * 10), { align: 'right' });
            });

            doc.setDrawColor(255, 255, 255);
            doc.line(x + 5, y + 15, x + labelWidth - 5, y + 15);

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

        doc.save('etiquetas-equipamento.pdf');
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
                        Detalhes do Equipamento
                    </Typography>
                    <IconButton onClick={onClose}>
                        <FaTimes style={{ color: '#666', fontSize: '20px' }} />
                    </IconButton>
                </Box>

                <Typography variant="body1">
                    <strong>Nome:</strong> {equipamento.nome || 'N/A'}
                </Typography>
                <Typography variant="body1">
                    <strong>Fabricante:</strong> {equipamento.fabricante || 'N/A'}
                </Typography>
                <Typography variant="body1">
                    <strong>Modelo:</strong> {equipamento.modelo || 'N/A'}
                </Typography>
                <Typography variant="body1">
                    <strong>Número de Série:</strong> {equipamento.numeroSerie || 'N/A'}
                </Typography>
                <Typography variant="body1">
                    <strong>Data de Cadastro:</strong> {equipamento.dataCadastro || 'N/A'}
                </Typography>
                <Typography variant="body1">
                    <strong>Status:</strong> {equipamento.status || 'N/A'}
                </Typography>

                <Box mt={3} display="flex" alignItems="center">
                    <TextField
                        label="Quantidade de Etiquetas"
                        type="number"
                        value={quantidadeEtiquetas}
                        onChange={(e) =>
                            setQuantidadeEtiquetas(parseInt(e.target.value) || 1)
                        }
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

export default EquipamentoDetailOverlay;
