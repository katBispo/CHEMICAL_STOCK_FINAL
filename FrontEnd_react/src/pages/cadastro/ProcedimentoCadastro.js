import React, { useState } from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    TextField,
    Input,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from '../components/SideBar.js'; // Importe o novo componente
import { useNavigate } from 'react-router-dom';

function ProcedimentoCadastro() {
    const [drawerOpen, setDrawerOpen] = useState(true);
    const [nomeProcedimento, setNomeProcedimento] = useState('');
    const [descricao, setDescricao] = useState('');
    const [pdfFile, setPdfFile] = useState(null);
    const [dataCadastro, setDataCadastro] = useState(new Date().toISOString().split('T')[0]); // Definir data de cadastro como a data atual (em formato YYYY-MM-DD)
    
    const navigate = useNavigate();

    const toggleDrawer = () => {
        setDrawerOpen((prev) => !prev);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('nomeProcedimento', nomeProcedimento);
        formData.append('descricaoProcedimento', descricao);
        formData.append('pdfFile', pdfFile);
        formData.append('dataCadastro', dataCadastro); // Enviar a dataCadastro
    
        try {
            const response = await fetch('http://localhost:8080/procedimento', {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                console.log('Procedimento salvo com sucesso');
            } else {
                console.error('Erro ao salvar o procedimento');
                const errorData = await response.json();
                console.error('Detalhes do erro:', errorData);
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    return (
        <Box display="flex" justifyContent="flex-start" gap={2}>
            <AppBar position="fixed" sx={{ bgcolor: '#4CAF50', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Cadastro de Procedimento
                    </Typography>
                </Toolbar>
            </AppBar>

            <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

            <Box
                sx={{
                    backgroundColor: 'white',
                    padding: '30px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    maxWidth: '800px',
                    marginLeft: '200px',
                    marginTop: '90px', // Ajuste este valor conforme necessário
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Cadastrar Procedimento
                </Typography>
                <form onSubmit={handleSubmit}>
                    {/* Nome do Procedimento */}
                    <TextField
                        label="Nome do Procedimento"
                        value={nomeProcedimento}
                        onChange={(e) => setNomeProcedimento(e.target.value)}
                        required
                        margin="normal"
                        fullWidth
                    />

                    {/* Descrição */}
                    <TextField
                        label="Descrição Geral"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                        margin="normal"
                        multiline
                        rows={4}
                        style={{ width: '100%' }}
                    />

                    {/* Campo de Upload de PDF */}
                    <Input
                        type="file"
                        inputProps={{ accept: 'application/pdf' }}
                        onChange={(e) => setPdfFile(e.target.files[0])}
                        required
                        style={{ marginTop: '16px' }}
                    />

                    {/* Botão de Salvar */}
                    <Box display="flex" justifyContent="center" marginTop={2}>
                        <Button variant="contained" type="submit">
                            Salvar
                        </Button>
                    </Box>
                </form>

            </Box>
        </Box>
    );
}

export default ProcedimentoCadastro;