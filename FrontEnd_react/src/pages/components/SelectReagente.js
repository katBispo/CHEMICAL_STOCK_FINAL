import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Autocomplete,
    Select,
    MenuItem,
    Button,
    Box
} from '@mui/material';

const reagentes = [
    { id: 1, nome: 'Ácido Sulfúrico' },
    { id: 2, nome: 'Hidróxido de Sódio' },
    { id: 3, nome: 'Cloreto de Sódio' },
    { id: 4, nome: 'Ácido Nítrico' },
];

const unidadesMedida = ['mL', 'g', 'kg', 'L'];

function SelectReagente({ open, onClose, onSave }) {
    const [reagenteSelecionado, setReagenteSelecionado] = useState(null);
    const [quantidade, setQuantidade] = useState('');
    const [unidade, setUnidade] = useState('');

    const handleSave = () => {
        if (reagenteSelecionado && quantidade && unidade) {
            onSave({ reagente: reagenteSelecionado, quantidade, unidade });
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Selecionar Reagente</DialogTitle>
            <DialogContent>
                <Box display="flex" gap={2} alignItems="center" marginBottom={2}>
                    <Autocomplete
                        options={reagentes}
                        getOptionLabel={(option) => option.nome}
                        value={reagenteSelecionado}
                        onChange={(event, newValue) => setReagenteSelecionado(newValue)}
                        renderInput={(params) => <TextField {...params} label="Reagente" variant="outlined" fullWidth />}
                    />
                    <TextField
                        label="Quantidade"
                        type="number"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        variant="outlined"
                        sx={{ width: '100px' }}
                    />
                    <Select
                        value={unidade}
                        onChange={(e) => setUnidade(e.target.value)}
                        displayEmpty
                        variant="outlined"
                        sx={{ width: '100px' }}
                    >
                        <MenuItem value="" disabled>Unidade</MenuItem>
                        {unidadesMedida.map((unidade) => (
                            <MenuItem key={unidade} value={unidade}>{unidade}</MenuItem>
                        ))}
                    </Select>
                </Box>
                <Box display="flex" justifyContent="space-between" marginTop={2}>
                    <Button variant="contained" color="primary" onClick={handleSave} disabled={!reagenteSelecionado || !quantidade || !unidade}>
                        Salvar
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={onClose}>
                        Fechar
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default SelectReagente;
