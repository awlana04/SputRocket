import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import StartupProfile from '../models/StartupProfile';

export default {
  async index(request: Request, response: Response) {
    const startupProfileRepository = getRepository(StartupProfile);

    const startuProfiles = await startupProfileRepository.find();

    return response.json(startuProfiles);
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const startupProfileRepository = getRepository(StartupProfile);

    const startupProfile = await startupProfileRepository.findOneOrFail(id);

    return response.json(startupProfile);
  },

  async create(request: Request, response: Response) {
    const {
      name,
      creation_date,
      email,
      password,
    } = request.body;
  
    const startupProfileRepository = getRepository(StartupProfile);
  
    const startupProfile = startupProfileRepository.create({
      name,
      creation_date,
      email,
      password,
    });
  
    await startupProfileRepository.save(startupProfile);

    return response.status(201).json(startupProfile)
  },
};