import React, { useState } from 'react';
import { makePrivateRequest } from 'core/utils/request';
import BaseForm from '../../BaseForm';
import './styles.scss';

type FormState = {
  name: string;
  category: string;
  price: string;
  description:string;
}

type FormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

const Form = () => {

  const [formData, setFormData] = useState<FormState>({
    name: '',
    category: '',
    price: '',
    description: ''
  });
  
  const handleOnChange = (event: FormEvent) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      ...formData,
      imgUrl: 'https://images7.kabum.com.br/produtos/fotos/115737/console-sony-playstation-5-midia-fisica_1598984720_g.jpg',
      categories: [{ id: formData.category}],
    }

    makePrivateRequest({url: '/products', method: 'POST', data: payload})
    .then(() => { setFormData({name: '', category:'', price:'', description:''});
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <BaseForm title="cadastrar um produto">
        <div className="row">
          <div className="col-6">
            <input
              value={formData.name}
              name="name"
              type="text"
              className="form-control mb-5"
              onChange={handleOnChange}
              placeholder="Nome do Porduto"
            />
            <select
              value={formData.category}
              name="category"
              className="form-control mb-5"
              onChange={handleOnChange}
            >
              <option value="1">Livros</option>
              <option value="2">Eletronicos</option>
              <option value="3">Computadores</option>
            </select>
            <input
              value={formData.price}
              name="price"
              type="text"
              className="form-control"
              onChange={handleOnChange}
              placeholder="Preço"
            />
          </div>
          <div className="col-6">
            <textarea 
              name="description" 
              value={formData.description}
              onChange={handleOnChange}
              className="form-control"
              cols={30} 
              rows={10}
             />
          </div>
        </div>
      </BaseForm>
    </form>
  );
}

export default Form;