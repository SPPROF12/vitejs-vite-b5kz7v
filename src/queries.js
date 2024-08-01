import { HttpError } from 'wasp/server'

export const getSuppliers = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }
  return context.entities.Supplier.findMany({ where: { companyId: context.user.companies[0].id }, include: { company: true } })
}

export const getLogistics = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }
  return context.entities.Logistic.findMany({ where: { companyId: context.user.companies[0].id }, include: { company: true } })
}