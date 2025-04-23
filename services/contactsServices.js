import Contact from "../db/models/Contacts.js";

// Повертає масив контактів
export const listContacts = async () => Contact.findAll();

//Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений
export const getContactById = (contactId) =>
   Contact.findOne({
      where: { id: contactId },
   });

//Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений
export const removeContact = async (id) => {
   const contact = await getContactById(id);
   if (!contact) return null;

   await Contact.destroy({
      where: { id },
   });

   return contact;
};

//Повертає об'єкт доданого контакту (з id)
export const addContact = (data) => Contact.create(data);

//Повертає об'єкт оновленого контакту. Повертає null, якщо контакт з таким id не знайдений
export const updateContact = async (contactId, data) => {
   const contact = await getContactById(contactId);
   if (!contact) return null;

   return contact.update(data, {
      returning: true,
   });
};

//Повертає об'єкт оновленого контакту (тільки поле favorite). Повертає null, якщо контакт з таким id не знайдений
export const updateStatusContact = async (contactId, { favorite }) => {
   const contact = await getContactById(contactId);
   if (!contact) return null;

   return contact.update(
      { favorite },
      {
         returning: true,
      }
   );
};
