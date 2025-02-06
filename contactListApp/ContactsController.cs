using ContactListApp.Data;
using ContactListApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class ContactsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ContactsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
    {
        return await _context.Contacts.ToListAsync();
    {
    
    [HttpPost]
    public async Task<ActionResult<Contact>> CreateContact(Contact contact)
    {
        _context.Contacts.Add(contact);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetContacts), new { id = contact.Id }, contact);
    }
}