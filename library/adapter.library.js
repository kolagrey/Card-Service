exports.isValidPayload = (payload) => {
  if ((!payload.firstname) || (!payload.lastname) || (!payload.password) || (!payload.email)) {
    return false
  }
  return true;
}

exports.isValidBusinessPayload = (payload) => {
  if ((!payload.organisation) || (!payload.contact_name) || (!payload.password) || (!payload.mobile) || (!payload.email)) {
    return false
  }
  return true;
}


exports.isValidBusinessUserPayload = (payload) => {
  if ((!payload.firstname)
  || (!payload.lastname)
  || (!payload.email)
  || (!payload.mobile)
  || (!payload.password)
  || (!payload.organisation)
  || (!payload.organisation.id)
  || (!payload.organisation.name))
  {
    return false
  }
  return true;
}