import React, { useState } from 'react';
import { Box, Modal, Typography, IconButton, Button, TextField } from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import jsPDF from 'jspdf';


const AmostraDetailOverlay = ({ open, onClose, amostra }) => {
    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        doc.text(`Detalhes da Amostra`, 10, 10);
        doc.text(`Nome: ${amostra.nome}`, 10, 20);
        doc.text(`Data de Cadastro: ${amostra.dataCadastro}`, 10, 30);
        doc.text(`Prazo de Finalização: ${amostra.prazoFinalizacao}`, 10, 40);
        doc.text(`Endereço de Coleta: ${amostra.enderecoColeta}`, 10, 50);
        doc.text(`Data de Coleta: ${amostra.dataColeta}`, 10, 60);
        doc.text(`Descrição: ${amostra.descricao}`, 10, 70);
        doc.text(`Procedimento: ${amostra.procedimento?.nome || 'N/A'}`, 10, 80);
        doc.text(`Análise: ${amostra.analise?.nome || 'N/A'}`, 10, 90);

        doc.text(`Analitos Selecionados:`, 10, 100);
        if (amostra.analitos && amostra.analitos.length > 0) {
            amostra.analitos.forEach((analito, index) => {
                doc.text(`- ${analito.classificacao || 'N/A'}`, 10, 110 + index * 10);
            });
        } else {
            doc.text(`Nenhum analito selecionado`, 10, 110);
        }

        doc.save('detalhes_amostra.pdf');
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
                    <strong>Procedimento:</strong> {amostra.procedimento?.nome || 'N/A'}
                </Typography>
                <Typography variant="body1">
                    <strong>Análise:</strong> {amostra.analise?.nome || 'N/A'}
                </Typography>
                <Typography variant="body1">
                    <strong>Analitos:</strong>{' '}
                    {amostra.analitos && amostra.analitos.length > 0
                        ? amostra.analitos.map((analito, index) => (
                              <span key={index}>
                                  {analito.classificacao}
                                  {index < amostra.analitos.length - 1 && ', '}
                              </span>
                          ))
                        : 'Nenhum analito selecionado'}
                </Typography>

                <Box mt={3} display="flex" justifyContent="flex-end">
                    <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
                        Baixar Detalhes em PDF
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AmostraDetailOverlay;
