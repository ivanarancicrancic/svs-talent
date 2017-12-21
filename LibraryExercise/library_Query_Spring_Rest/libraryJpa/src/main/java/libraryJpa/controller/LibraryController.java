package libraryJpa.controller;

import libraryJpa.model.Book;
import libraryJpa.model.Library_user;
import libraryJpa.service.BookService;
import libraryJpa.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1")
public class LibraryController {
    @Autowired
    BookService service;

    @Autowired
    UserService service1;

    @RequestMapping(value = "/books", method = RequestMethod.GET)
    public List<Book> getBooks(){
        return service.getAllBooks();
    }

    @RequestMapping(value = "/lib_accounts", method = RequestMethod.GET)
    public List<Library_user> getUsers(){
//               List<Library_user> users = new ArrayList<>();
//               users.add(new Library_user("Ivana","R"));
//               return users;
        return service1.getAllLibAccounts();
    }


    @RequestMapping(value = "/books", method = RequestMethod.POST)
    @ResponseBody
    public Book createBook(@RequestParam(value="book_title") String title, @RequestParam(value="book_description") String description){
        Book book = new Book(title, description);
        System.out.println("Creating new book!");
         return service.createBook(book);
    }

    @RequestMapping(value = "/lib_accounts", method = RequestMethod.POST)
    @ResponseBody
    public Library_user createUser(@RequestParam(value="first_name") String first_name, @RequestParam(value="surname") String surname){
        Library_user libraryuser = new Library_user(first_name, surname);
        System.out.println("Creating new Library_user!");
        return service1.createUser(libraryuser);
    }

    @RequestMapping(value = "/books/{id}", method = RequestMethod.PUT)
    public @ResponseBody Book update(@PathVariable Long id, @RequestBody Book book){
        return service.updateBook(id, book);
    }

    @RequestMapping(value = "/lib_accounts/{id}", method = RequestMethod.PUT)
    public @ResponseBody
    Library_user update(@PathVariable Long id, @RequestBody Library_user libraryuser){
        return service1.updateUser(id, libraryuser);
    }

    @RequestMapping(value = "/books/{id}", method = RequestMethod.DELETE)
    public Book delete(@PathVariable Long id){
        return service.deleteBook(id);

    }


    @RequestMapping(value = "/lib_accounts/{id}", method = RequestMethod.DELETE)
    public Library_user deleteUser(@PathVariable Long id){
        return service1.deleteUser(id);
    }
}
