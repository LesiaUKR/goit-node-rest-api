import Contact from "../db/models/Contact.js";

// Повертає масив контактів конкретного користувача з пагінацією та фільтрацією
export const listContacts = async (userId, query = {}) => {
  const { page = 1, limit = 20, favorite } = query;
  const offset = (page - 1) * limit;
  
  const whereClause = { owner: userId };
  
  if (favorite !== undefined) {
    whereClause.favorite = favorite === 'true';
  }
  
  return Contact.findAndCountAll({
    where: whereClause,
    limit: Number(limit),
    offset: Number(offset),
  });
};

// Повертає об'єкт контакту з таким id і власником. Повертає null, якщо контакт не знайдений
export const getContactById = (contactId, userId) =>
  Contact.findOne({
    where: { 
      id: contactId,
      owner: userId 
    },
  });

// Повертає об'єкт видаленого контакту. Повертає null, якщо контакт не знайдений
export const removeContact = async (contactId, userId) => {
  const contact = await getContactById(contactId, userId);
  if (!contact) return null;

  await Contact.destroy({
    where: { 
      id: contactId,
      owner: userId 
    },
  });

  return contact;
};

// Повертає об'єкт доданого контакту (з id)
export const addContact = (data, userId) => 
  Contact.create({ ...data, owner: userId });

// Повертає об'єкт оновленого контакту. Повертає null, якщо контакт не знайдений
export const updateContact = async (contactId, data, userId) => {
  const contact = await getContactById(contactId, userId);
  if (!contact) return null;

  return contact.update(data, {
    returning: true,
  });
};

// Повертає об'єкт оновленого контакту (тільки поле favorite). Повертає null, якщо контакт не знайдений
export const updateStatusContact = async (contactId, { favorite }, userId) => {
  const contact = await getContactById(contactId, userId);
  if (!contact) return null;

  return contact.update(
    { favorite },
    {
      returning: true,
    }
  );
};