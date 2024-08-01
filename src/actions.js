import { HttpError } from 'wasp/server'

export const createSupplier = async ({ name, carbonFootprint }, context) => {
  if (!context.user) { throw new HttpError(401) };
  const user = await context.entities.User.findUnique({
    where: { id: context.user.id }
  });
  const newSupplier = await context.entities.Supplier.create({
    data: {
      name: name,
      carbonFootprint: carbonFootprint,
      company: {
        connect: { id: user.companies[0].id }
      }
    }
  });
  return newSupplier;
}

export const updateSupplier = async ({ supplierId, name, carbonFootprint }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const supplier = await context.entities.Supplier.findUnique({
    where: { id: supplierId }
  });

  if (supplier.company.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Supplier.update({
    where: { id: supplierId },
    data: { name, carbonFootprint }
  });
}

export const createLogistic = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const company = await context.entities.Company.findFirst({
    where: { userId: context.user.id }
  });

  if (!company) { throw new HttpError(403, 'User does not have a company') };

  return context.entities.Logistic.create({
    data: {
      name: args.name,
      carbonFootprint: args.carbonFootprint,
      company: { connect: { id: company.id } }
    }
  });
}

export const updateLogistic = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const logistic = await context.entities.Logistic.findUnique({
    where: { id: args.logisticId }
  });
  if (logistic.company.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Logistic.update({
    where: { id: args.logisticId },
    data: {
      name: args.name,
      carbonFootprint: args.carbonFootprint
    }
  });
}