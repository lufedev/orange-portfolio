import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors';

export default async function handler(req: NextApiRequest,res: NextApiResponse)
{

    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });

    var name = req.body.name
    var surname = req.body.surname
    var username = req.body
    var email = req.body.email
    var senha = req.body.senha

    if(username == undefined || username <= 0 || email == undefined || email <= 0 || senha == undefined || senha <= 0)
    {
        return res.status(400).json(
            { status: 'false',
            msng: 'Parametros invalidos ou faltando'}
            )
    }
    return res.status(200).json(
        { status: 'true',
        msng: 'Cadastrado com sucesso!'}
        )
        

}