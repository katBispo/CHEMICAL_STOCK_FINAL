import React, { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    Autocomplete,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Typography
} from '@mui/material';

const AnalitoSelector = ({ onClose }) => {
    const [selectedProcedure, setSelectedProcedure] = useState(null);
    const [checkboxSections, setCheckboxSections] = useState([]);

    const procedures = [
        { label: 'Pesticidas' },
        { label: 'Hormônios' },
        { label: 'Derivados de Petróleo' },
        { label: 'Ftalatos' },
        { label: 'Tintas anti incrustantes' },
    ];

    const handleAnalitoSelection = (event, value) => {
        setSelectedProcedure(value);
        if (value) {
            switch (value.label) {
                case 'Pesticidas':
                    setCheckboxSections([
                        { title: 'Organoclorados', options: ['DDT', 'Aldrin', 'Dieldrin'] },
                        { title: 'Organofosforados', options: ['Paration', 'Malation', 'Clorpirifós'] },
                        { title: 'Carbamatos', options: ['Carbofurano', 'Aldicarbe', 'Metomil'] },
                        { title: 'Piretróides', options: ['Permetrina', 'Cipermetrina', 'Deltametrina'] }
                    ]);
                    break;
                case 'Hormônios':
                    setCheckboxSections([
                        { title: 'Esteroides', options: ['Estrona', '17β-estradiol', 'Progesterona'] },
                        { title: 'Corticosteroides', options: ['Cortisol', 'Aldosterona', 'Prednisolona'] },
                        { title: 'Andrógenos', options: ['Testosterona', 'Androstenediona', 'Dihidrotestosterona (DHT)'] }
                    ]);
                    break;
                case 'Derivados de Petróleo':
                    setCheckboxSections([
                        { title: 'PAHs', options: ['Benzo(a)pireno', 'Naftaleno', 'Antraceno'] },
                        { title: 'Compostos Voláteis', options: ['Benzeno', 'Tolueno', 'Xileno'] },
                        { title: 'Óleos e Graxas', options: ['Hexadecano', 'Octano', 'Decano'] }
                    ]);
                    break;
                case 'Ftalatos':
                    setCheckboxSections([
                        {
                            title: 'Compostos mais comuns', options: [
                                'Ftalato de dibutila (DBP)', 'Ftalato de di(2-etilhexila) (DEHP)',
                                'Ftalato de dietila (DEP)', 'Ftalato de butilbenzila (BBP)',
                                'Ftalato de diisononila (DINP)']
                        }
                    ]);
                    break;
                case 'Tintas anti incrustantes':
                    setCheckboxSections([
                        { title: 'Compostos com biocidas', options: ['Tributilestanho (TBT)', 'Trifenilestanho (TPT)', 'Dióxido de cobre (CuO)'] },
                        { title: 'Compostos alternativos', options: ['Zineb (um tipo de ditiocarbamato)', 'Diuron (herbicida)', 'Irgarol (algicida)'] }
                    ]);
                    break;
                default:
                    setCheckboxSections([]);
            }
        }
    };

    return (
        <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Escolha o Analito</DialogTitle>
            <DialogContent>
                {/* Campo de Autocomplete para Analitos */}
                <Autocomplete
                    options={procedures}
                    getOptionLabel={(option) => option.label}
                    onChange={handleAnalitoSelection}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Analitos"
                            required
                            margin="normal"
                            style={{ width: '350px' }}
                        />
                    )}
                />

                {/* Exibir checkboxes conforme a escolha do analito */}
                {checkboxSections.map((section, index) => (
                    <Box
                        key={index}
                        sx={{
                            backgroundColor: 'white',
                            padding: '20px',
                            marginTop: '10px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Typography variant="h6">{section.title}</Typography>
                        <FormGroup>
                            {section.options.map((option, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    control={<Checkbox />}
                                    label={option}
                                />
                            ))}
                        </FormGroup>
                    </Box>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Fechar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AnalitoSelector;
    