import React, { useEffect, useState } from 'react'

const ListadeAlunos = () => {
    const [alunos, setAlunos] = useState([])
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    
    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:3000/alunos")
            const data = await response.json()
            setAlunos(data)
        }

        fetchData()
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        await fetch("http://localhost:3000/alunos", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email })
        })
        
        const response = await fetch("http://localhost:3000/alunos")
        const data = await response.json()
        setAlunos(data)
        
    
        setNome('')
        setEmail('')
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <button type="submit">Adicionar</button>
            </form>
            
            <table border="1">
                <thead>
                    <tr>
                        <th>Matricula:</th>
                        <th>Nome:</th>
                        <th>Email:</th>
                    </tr>
                </thead>
                <tbody>
                    {alunos.map((aluno) => (
                        <tr key={aluno.id}>
                            <td>{aluno.id}</td>
                            <td>{aluno.nome}</td>
                            <td>{aluno.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListadeAlunos