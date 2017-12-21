package libraryJpa.service;

import libraryJpa.model.Book;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface BookService {

    public Book createBook(Book book);
    public List<Book> getAllBooks();
    public Book getBook(Long id);
    public Book updateBook(Long id, Book book);
    public Book deleteBook(Long id);



}
