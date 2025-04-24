import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAllContacts = async (req, res) => {
   const { id: userId } = req.user;
   const { page, limit, favorite } = req.query;
   
   const data = await contactsService.listContacts(userId, { page, limit, favorite });
   
   res.json({
      totalItems: data.count,
      contacts: data.rows,
      currentPage: Number(page) || 1,
      totalPages: Math.ceil(data.count / (Number(limit) || 20))
   });
};

const getOneContact = async (req, res) => {
   const { id } = req.params;
   const { id: userId } = req.user;
   
   const data = await contactsService.getContactById(id, userId);
   if (!data) {
      throw HttpError(404, `Contact with id ${id} not found`);
   }
   res.json(data);
};

const deleteContact = async (req, res) => {
   const { id } = req.params;
   const { id: userId } = req.user;
   
   const deletedContact = await contactsService.removeContact(id, userId);
   if (!deletedContact) {
      throw HttpError(404, `Contact with id ${id} not found`);
   }
   res.json(deletedContact);
};

const createContact = async (req, res) => {
   const { id: userId } = req.user;
   const result = await contactsService.addContact(req.body, userId);
   res.status(201).json(result);
};

const updateContact = async (req, res) => {
   const { id } = req.params;
   const { id: userId } = req.user;
   
   const result = await contactsService.updateContact(id, req.body, userId);
   if (!result) {
      throw HttpError(404, "Not found");
   }
   res.json(result);
};

const updateStatusContact = async (req, res) => {
   const { id } = req.params;
   const { id: userId } = req.user;
   
   const result = await contactsService.updateStatusContact(id, req.body, userId);
   if (!result) {
      throw HttpError(404, "Not found");
   }
   res.json(result);
};

export default {
   getAllContacts: ctrlWrapper(getAllContacts),
   getOneContact: ctrlWrapper(getOneContact),
   deleteContact: ctrlWrapper(deleteContact),
   createContact: ctrlWrapper(createContact),
   updateContact: ctrlWrapper(updateContact),
   updateStatusContact: ctrlWrapper(updateStatusContact),
};