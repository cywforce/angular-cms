import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import CMS from '../../core';
import { PAGE_TYPE_METADATA_KEY, PROPERTY_METADATA_KEY, PROPERTIES_METADATA_KEY } from './../../core/constants';

@Component({
    selector: 'cms-layout',
    templateUrl: './layout.component.html',
})
export class LayoutComponent {
    title = 'app';
    selectedPage: any;
    pages: Array<any> = [];

    setSelectedPage(page) {
        this.selectedPage = page;
    }

    ngOnInit() {
        CMS.PAGE_TYPES.forEach(pageType => {
            let metadata = Reflect.getMetadata(PAGE_TYPE_METADATA_KEY, pageType);
            for (var key in pageType) {
                console.log(key);
            }
            let properties = Reflect.getMetadata(PROPERTIES_METADATA_KEY, pageType);
            let propertiesMetadata = [];
            if (properties)
                properties.forEach(element => {
                    propertiesMetadata.push(Reflect.getMetadata(PROPERTY_METADATA_KEY, pageType, element))
                });
            this.pages.push({
                type: pageType,
                metadata: metadata,
                properties: propertiesMetadata
            })
        })
    }
}