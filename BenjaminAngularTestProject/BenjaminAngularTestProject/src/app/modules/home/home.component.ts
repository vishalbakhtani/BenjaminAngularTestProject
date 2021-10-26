import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseMediaWatcherService } from '../../../@fuse/services/media-watcher';
import { PostModel } from './models/post.model';
import { HomeService } from './shared/home.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    isScreenSmall: boolean;
    posts: Array<PostModel>;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _homeService: HomeService
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {

                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });

        this.posts = new Array<PostModel>();
        this.getPosts();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get Posts
     */
    getPosts(): void {
        this._homeService.getPosts().subscribe(response => {
            if (response && response.results && response.results.length > 0) {
                for (let result of response.results) {
                    let post = new PostModel();
                    post.salutation = result.name.title;
                    post.firstName = result.name.first;
                    post.lastName = result.name.last;
                    post.thumbnail = result.picture.thumbnail;
                    this.posts.push(post);
                }
            }
        });
    }
}
