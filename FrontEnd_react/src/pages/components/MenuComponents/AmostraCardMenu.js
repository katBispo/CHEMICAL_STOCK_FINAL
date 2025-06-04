import { Card, Typography, Box } from '@mui/material';
import { CalendarMonth, LocationOn } from '@mui/icons-material';

function AmostraCardMenu({ dataVencimento, nome, diasParaVencer, endereco }) {
    const dia = new Date(dataVencimento).getDate();

    return (
        <Card
            sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1.5,
                pl: 1,
                mb: 2,
                borderRadius: 3,
                boxShadow: 3,
                bgcolor: '#F9FAFB',
                height: 80,
                transition: '0.3s',
                '&:hover': {
                    boxShadow: 6,
                    bgcolor: '#F1F3F4',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#81C784',
                    borderRadius: 2,
                    width: 60,
                    height: 60,
                    mr: 2,
                }}
            >
                <CalendarMonth sx={{ fontSize: 20, color: 'white' }} />
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                    {dia}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0.3 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {nome}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                    Vence em <strong>{diasParaVencer} dias</strong>
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ fontSize: 14, color: 'gray', mr: 0.5 }} />
                    <Typography variant="caption" color="textSecondary">
                        {endereco}
                    </Typography>
                </Box>
            </Box>
        </Card>
    );
}

export default AmostraCardMenu;
