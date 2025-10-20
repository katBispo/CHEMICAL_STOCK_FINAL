import React, { useState } from 'react';
import { Box, Modal, Typography, IconButton, Button, TextField } from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import jsPDF from 'jspdf';

const AmostraDetailOverlay = ({ open, onClose, amostra }) => {
    const [quantidadeEtiquetas, setQuantidadeEtiquetas] = useState(1);

    const handleDownloadPDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const labelWidth = 60;
        const labelHeight = 70; // Altura ajustada para 70mm
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
            doc.text('ChemLab', x + labelWidth / 2, y + 10, { align: 'center' });


            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            const fields = [
                { label: 'Nº Amostra', value: amostra.id?.toString() || 'N/A' },
                { label: 'Nome', value: amostra.nome?.toString() || 'N/A' },
                { label: 'Prazo Final', value: amostra.prazoFinalizacao || 'N/A' },
                { label: 'Endereço Coleta', value: amostra.enderecoColeta?.toString() || 'N/A' },
                { label: 'Data Coleta', value: amostra.dataColeta?.toString() || 'N/A' }
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

        doc.save('etiquetas_amostra.pdf');
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
                        Detalhes da Amostra
                    </Typography>
                    <IconButton onClick={onClose}>
                        <FaTimes style={{ color: '#666', fontSize: '20px' }} />
                    </IconButton>
                </Box>

                <Typography variant="body1">
                    <strong>Nome:</strong> {amostra.nome}
                </Typography>
                <Typography variant="body1">
                    <strong>Data de Cadastro:</strong> {amostra.dataCadastro}
                </Typography>
                <Typography variant="body1">
                    <strong>Prazo de Finalização:</strong> {amostra.prazoFinalizacao}
                </Typography>
                <Typography variant="body1">
                    <strong>Endereço de Coleta:</strong> {amostra.enderecoColeta}
                </Typography>
                <Typography variant="body1">
                    <strong>Data de Coleta:</strong> {amostra.dataColeta}
                </Typography>
                <Typography variant="body1">
                    <strong>Descrição:</strong> {amostra.descricao}
                </Typography>
                <Typography variant="body1">
                    <strong>Procedimentos:</strong>{' '}
                    {amostra.procedimentosNomes && amostra.procedimentosNomes.length > 0
                        ? amostra.procedimentosNomes.join(', ')
                        : 'Nenhum procedimento'}
                </Typography>
                <Typography variant="body1">
                    <strong>Análise:</strong> {amostra.analise?.nome || 'N/A'}
                </Typography>
                <Typography variant="body1">
                    <strong>Analitos:</strong>{' '}
                    {amostra.analitosSelecionados && amostra.analitosSelecionados.length > 0 ? (
                        amostra.analitosSelecionados.map((analito, index) => (
                            <div key={index}>
                                <strong>{analito.classificacao}:</strong>{' '}
                                {analito.tipos.map((tipoObj, tIdx) => (
                                    <span key={tIdx}>
                                        {tipoObj.tipo} ({tipoObj.subtipos.join(', ')})
                                        {tIdx < analito.tipos.length - 1 && '; '}
                                    </span>
                                ))}
                            </div>
                        ))
                    ) : (
                        'Nenhum analito selecionado'
                    )}

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

export default AmostraDetailOverlay;