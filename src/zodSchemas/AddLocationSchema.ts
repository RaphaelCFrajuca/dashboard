import { z } from 'zod';
import { validaCep } from '../services/cep-validation-service';

export const addLocationFormSchema = z.object({
  name: z.string().min(5, 'Campo obrigatório').max(100),
  type: z
    .string()
    .nonempty({ message: 'Campo obrigatório' })
    .refine(
      (value) => {
        if (value === '1' || value === '2' || value === '3') {
          return true;
        } else {
          return false;
        }
      },
      { message: 'Selecione uma opção' }
    ),
  cep: z.string().refine((cep) => validaCep(cep), {
    message: 'CEP Inválido',
  }),
});

export type AddLocationFormSchemaType = z.infer<typeof addLocationFormSchema>;
