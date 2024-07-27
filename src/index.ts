import express from 'express';
import { json } from 'body-parser';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import portfolioRoutes from './routes/portfolio';
import { setupSwagger } from './swagger';

const app = express();

app.use(json());

setupSwagger(app);

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/portfolio', portfolioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;