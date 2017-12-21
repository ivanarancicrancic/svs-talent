package libraryJpa.service;

import libraryJpa.model.Book;
import libraryJpa.model.Library_user;
import libraryJpa.repository.BookRepository;
import libraryJpa.repository.BookRepository1;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("bookService")
@Component
public class BookSerivceImpl implements BookService {

    @Autowired
     BookRepository1 repository1;

    @Autowired
    BookRepository repository;


    @Override
    public Book createBook(Book book){ return repository1.createBook(book); }

    @Override
    public List<Book> getAllBooks(){ return repository1.getBooks();}


    @Override
    public Book getBook(Long id){ return repository1.getBook(id);}

    @Override
    public Book updateBook(Long id, Book book){ return repository1.updateBook(id,book);}

    @Override
    public Book deleteBook(Long id){ return repository1.deleteBook(id);}

}
